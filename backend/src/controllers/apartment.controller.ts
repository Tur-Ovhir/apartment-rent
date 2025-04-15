import { RequestHandler, Response } from "express";
import db from "../database";
import { apartments } from "../database/schema";
import { and, eq, or, like, gte, lte, count } from "drizzle-orm";
import { CustomRequest } from "../utils/customHandler";

export const createApartment: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== "owner") {
      res.status(403).json({ message: "Only owners can create apartments" });
      return;
    }

    const {
      title,
      price,
      rooms,
      bathrooms,
      area,
      builtYear,
      floor,
      isFurnished,
      facing,
      description,
      location,
      latitude,
      longitude,
      interiorCategory,
      otherCategory,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !price ||
      !rooms ||
      !bathrooms ||
      !area ||
      !location ||
      !latitude ||
      !longitude
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const [newApartment] = await db
      .insert(apartments)
      .values({
        title,
        price,
        rooms,
        bathrooms,
        area,
        builtYear,
        floor,
        isFurnished: isFurnished || false,
        facing,
        description,
        location,
        latitude,
        longitude,
        interiorCategory,
        otherCategory,
        ownerId: req.user.userId,
      })
      .returning();

    res.status(201).json({
      message: "Apartment created successfully",
      apartment: newApartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getApartments: RequestHandler = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      minRooms,
      maxRooms,
      minArea,
      maxArea,
      isFurnished,
      facing,
      interiorCategory,
      otherCategory,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    // Build the where clause dynamically based on provided filters
    const whereClause = and(
      minPrice ? gte(apartments.price, Number(minPrice)) : undefined,
      maxPrice ? lte(apartments.price, Number(maxPrice)) : undefined,
      minRooms ? gte(apartments.rooms, Number(minRooms)) : undefined,
      maxRooms ? lte(apartments.rooms, Number(maxRooms)) : undefined,
      minArea ? gte(apartments.area, Number(minArea)) : undefined,
      maxArea ? lte(apartments.area, Number(maxArea)) : undefined,
      isFurnished !== undefined
        ? eq(apartments.isFurnished, isFurnished === "true")
        : undefined,
      facing ? eq(apartments.facing, String(facing)) : undefined,
      interiorCategory
        ? eq(apartments.interiorCategory, String(interiorCategory))
        : undefined,
      otherCategory
        ? eq(apartments.otherCategory, String(otherCategory))
        : undefined,
      search
        ? or(
            like(apartments.title, `%${search}%`),
            like(apartments.location, `%${search}%`),
            like(apartments.description, `%${search}%`)
          )
        : undefined
    );

    const allApartments = await db
      .select()
      .from(apartments)
      .where(whereClause)
      .limit(Number(limit))
      .offset(offset);

    const totalCount = await db
      .select({ count: count() })
      .from(apartments)
      .where(whereClause)
      .then((res) => res[0]?.count || 0);

    res.status(200).json({
      apartments: allApartments,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getApartmentById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const [apartment] = await db
      .select()
      .from(apartments)
      .where(eq(apartments.id, Number(id)))
      .limit(1);

    if (!apartment) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    res.status(200).json({ apartment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateApartment: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const updateData = req.body;

    // Check if apartment exists and belongs to the user (if user is owner)
    const [existingApartment] = await db
      .select()
      .from(apartments)
      .where(eq(apartments.id, Number(id)))
      .limit(1);

    if (!existingApartment) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    if (
      req.user.role === "owner" &&
      existingApartment.ownerId !== req.user.userId
    ) {
      res
        .status(403)
        .json({ message: "You can only update your own apartments" });
      return;
    }

    // Don't allow changing ownerId
    if (updateData.ownerId) {
      delete updateData.ownerId;
    }

    const [updatedApartment] = await db
      .update(apartments)
      .set(updateData)
      .where(eq(apartments.id, Number(id)))
      .returning();

    res.status(200).json({
      message: "Apartment updated successfully",
      apartment: updatedApartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteApartment: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;

    // Check if apartment exists and belongs to the user (if user is owner)
    const [existingApartment] = await db
      .select()
      .from(apartments)
      .where(eq(apartments.id, Number(id)))
      .limit(1);

    if (!existingApartment) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    if (
      req.user.role === "owner" &&
      existingApartment.ownerId !== req.user.userId
    ) {
      res
        .status(403)
        .json({ message: "You can only delete your own apartments" });
      return;
    }

    // Admin can delete any apartment
    if (
      req.user.role !== "admin" &&
      existingApartment.ownerId !== req.user.userId
    ) {
      res
        .status(403)
        .json({ message: "Unauthorized to delete this apartment" });
      return;
    }

    await db.delete(apartments).where(eq(apartments.id, Number(id)));

    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getOwnerApartments: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== "owner") {
      res
        .status(403)
        .json({ message: "Only owners can view their apartments" });
      return;
    }

    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const ownerApartments = await db
      .select()
      .from(apartments)
      .where(eq(apartments.ownerId, req.user.userId))
      .limit(Number(limit))
      .offset(offset);

    const totalCount = await db
      .select({ count: count() })
      .from(apartments)
      .where(eq(apartments.ownerId, req.user.userId))
      .then((res) => res[0]?.count || 0);

    res.status(200).json({
      apartments: ownerApartments,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
