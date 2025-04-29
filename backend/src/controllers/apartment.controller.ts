import { RequestHandler, Response } from "express";
import db from "../database";
import { apartments, apartmentImages } from "../database/schema";
import { and, eq, or, like, gte, lte, inArray, count } from "drizzle-orm";
import { CustomRequest } from "../utils/customHandler";

interface ApartmentCreateData {
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  floor: number;
  isFurnished: boolean;
  isHighlight: boolean;
  facing?: string;
  description?: string;
  location: string;
  latitude: string;
  longitude: string;
  interiorCategory?: string;
  otherCategory?: string;
  images?: string[];
}

interface ApartmentUpdateData extends Partial<ApartmentCreateData> {
  images?: string[];
}

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
      isHighlight,
      facing,
      description,
      location,
      latitude,
      longitude,
      interiorCategory,
      otherCategory,
      images,
    } = req.body as ApartmentCreateData;

    // Validation
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

    if (price <= 0 || rooms <= 0 || bathrooms <= 0 || area <= 0) {
      res.status(400).json({ message: "Numeric values must be positive" });
      return;
    }

    // Create apartment transaction
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
        isHighlight: isHighlight || false,
        facing,
        description,
        location,
        latitude,
        longitude,
        interiorCategory,
        otherCategory,
        ownerId: req.user!.userId,
      })
      .returning();

    // Add images if provided
    if (images && images.length > 0) {
      await db.insert(apartmentImages).values(
        images.map((imageUrl) => ({
          apartmentId: newApartment.id,
          imageUrl,
        }))
      );
    }

    // Get the apartment with images
    const apartmentWithImages = await getApartmentWithImages(newApartment.id);

    res.status(201).json({
      message: "Apartment created successfully",
      apartment: apartmentWithImages,
    });
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ message: "Internal server error" });
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
      isHighlight,
      facing,
      interiorCategory,
      otherCategory,
      search,
      location,
      page = 1,
      limit = 10,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    // Build filter conditions
    const conditions = [
      minPrice ? gte(apartments.price, Number(minPrice)) : undefined,
      maxPrice ? lte(apartments.price, Number(maxPrice)) : undefined,
      minRooms ? gte(apartments.rooms, Number(minRooms)) : undefined,
      maxRooms ? lte(apartments.rooms, Number(maxRooms)) : undefined,
      minArea ? gte(apartments.area, Number(minArea)) : undefined,
      maxArea ? lte(apartments.area, Number(maxArea)) : undefined,
      location ? like(apartments.location, `${location}%`) : undefined,
      isHighlight !== undefined
        ? eq(apartments.isHighlight, isHighlight === "true")
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
        : undefined,
    ].filter(Boolean);

    // Get apartments
    const apartmentsList = await db
      .select()
      .from(apartments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(Number(limit))
      .offset(offset);

    // Get count
    const totalCount = await db
      .select({ count: count() })
      .from(apartments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .then((res) => res[0]?.count || 0);

    // Get images for each apartment
    const apartmentIds = apartmentsList.map((a) => a.id);
    const images =
      apartmentIds.length > 0
        ? await db
            .select()
            .from(apartmentImages)
            .where(inArray(apartmentImages.apartmentId, apartmentIds))
        : [];

    // Combine apartments with their images
    const apartmentsWithImages = apartmentsList.map((apartment) => ({
      ...apartment,
      images: images
        .filter((img) => img.apartmentId === apartment.id)
        .map((img) => img.imageUrl),
    }));

    res.status(200).json({
      apartments: apartmentsWithImages,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error getting apartments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApartmentById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const apartmentWithImages = await getApartmentWithImages(Number(id));

    if (!apartmentWithImages) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    res.status(200).json({ apartment: apartmentWithImages });
  } catch (error) {
    console.error("Error getting apartment:", error);
    res.status(500).json({ message: "Internal server error" });
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
    const updateData = req.body as ApartmentUpdateData;

    // Check if apartment exists
    const [existingApartment] = await db
      .select()
      .from(apartments)
      .where(eq(apartments.id, Number(id)))
      .limit(1);

    if (!existingApartment) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    // Authorization check
    if (
      req.user.role === "owner" &&
      existingApartment.ownerId !== req.user.userId
    ) {
      res
        .status(403)
        .json({ message: "You can only update your own apartments" });
      return;
    }

    // Transaction for updating apartment and images
    const [updatedApartment] = await db
      .update(apartments)
      .set({
        ...updateData,
      })
      .where(eq(apartments.id, Number(id)))
      .returning();

    if (updateData.images) {
      await db
        .delete(apartmentImages)
        .where(eq(apartmentImages.apartmentId, Number(id)));

      if (updateData.images.length > 0) {
        await db.insert(apartmentImages).values(
          updateData.images.map((imageUrl) => ({
            apartmentId: Number(id),
            imageUrl,
          }))
        );
      }
    }

    // Get the updated apartment with images
    const apartmentWithImages = await getApartmentWithImages(Number(id));

    res.status(200).json({
      message: "Apartment updated successfully",
      apartment: apartmentWithImages,
    });
  } catch (error) {
    console.error("Error updating apartment:", error);
    res.status(500).json({ message: "Internal server error" });
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

    // Check if apartment exists
    const [existingApartment] = await db
      .select()
      .from(apartments)
      .where(eq(apartments.id, Number(id)))
      .limit(1);

    if (!existingApartment) {
      res.status(404).json({ message: "Apartment not found" });
      return;
    }

    // Authorization check
    if (
      req.user.role !== "admin" &&
      existingApartment.ownerId !== req.user.userId
    ) {
      res
        .status(403)
        .json({ message: "Unauthorized to delete this apartment" });
      return;
    }

    // Transaction to delete apartment and its images
    await db
      .delete(apartmentImages)
      .where(eq(apartmentImages.apartmentId, Number(id)));

    await db.delete(apartments).where(eq(apartments.id, Number(id)));

    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ message: "Internal server error" });
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

    // Get owner's apartments
    const ownerApartments = await db
      .select()
      .from(apartments)
      .where(eq(apartments.ownerId, req.user.userId))
      .limit(Number(limit))
      .offset(offset);

    // Get count
    const totalCount = await db
      .select({ count: count() })
      .from(apartments)
      .where(eq(apartments.ownerId, req.user.userId))
      .then((res) => res[0]?.count || 0);

    // Get images for these apartments
    const apartmentIds = ownerApartments.map((a) => a.id);
    const images =
      apartmentIds.length > 0
        ? await db
            .select()
            .from(apartmentImages)
            .where(inArray(apartmentImages.apartmentId, apartmentIds))
        : [];

    // Combine apartments with their images
    const apartmentsWithImages = ownerApartments.map((apartment) => ({
      ...apartment,
      images: images
        .filter((img) => img.apartmentId === apartment.id)
        .map((img) => img.imageUrl),
    }));

    res.status(200).json({
      apartments: apartmentsWithImages,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error getting owner apartments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to get apartment with its images
async function getApartmentWithImages(apartmentId: number) {
  const [apartment] = await db
    .select()
    .from(apartments)
    .where(eq(apartments.id, apartmentId))
    .limit(1);

  if (!apartment) return null;

  const images = await db
    .select()
    .from(apartmentImages)
    .where(eq(apartmentImages.apartmentId, apartmentId));

  return {
    ...apartment,
    images: images.map((img) => img.imageUrl),
  };
}
