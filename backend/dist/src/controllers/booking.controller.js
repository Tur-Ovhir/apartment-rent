"use strict";
// import { RequestHandler, Response } from "express";
// import db from "../database";
// import { bookings, apartments, users } from "../database/schema";
// import { and, count, eq, gte, inArray, lte, or } from "drizzle-orm";
// import { CustomRequest } from "../utils/customHandler";
// interface BookingCreateData {
//   apartmentId: number;
//   startDate: string;
//   endDate: string;
//   contractText?: string;
//   contractUrl?: string;
// }
// interface BookingUpdateData {
//   status?: "pending" | "approved" | "rejected" | "completed" | "cancelled";
//   contractText?: string;
//   contractUrl?: string;
// }
// export const createBooking: RequestHandler = async (
//   req: CustomRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const { apartmentId, startDate, endDate, contractText, contractUrl } =
//       req.body as BookingCreateData;
//     // Validate required fields
//     if (!apartmentId || !startDate || !endDate) {
//       res.status(400).json({
//         message: "Apartment ID, start date, and end date are required",
//       });
//       return;
//     }
//     // Validate dates
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const now = new Date();
//     if (start >= end) {
//       res.status(400).json({ message: "End date must be after start date" });
//       return;
//     }
//     if (start < now) {
//       res.status(400).json({ message: "Start date cannot be in the past" });
//       return;
//     }
//     // Check apartment exists
//     const [apartment] = await db
//       .select()
//       .from(apartments)
//       .where(eq(apartments.id, apartmentId))
//       .limit(1);
//     if (!apartment) {
//       res.status(404).json({ message: "Apartment not found" });
//       return;
//     }
//     // Check for overlapping bookings
//     const overlappingBookings = await db
//       .select()
//       .from(bookings)
//       .where(
//         and(
//           eq(bookings.apartmentId, apartmentId),
//           or(
//             and(gte(bookings.startDate, start), lte(bookings.startDate, end)),
//             and(gte(bookings.endDate, start), lte(bookings.endDate, end)),
//             and(lte(bookings.startDate, start), gte(bookings.endDate, end))
//           ),
//           or(eq(bookings.status, "pending"), eq(bookings.status, "approved"))
//         )
//       );
//     if (overlappingBookings.length > 0) {
//       res.status(409).json({
//         message: "Apartment is already booked for the selected dates",
//       });
//       return;
//     }
//     // Create booking
//     const [newBooking] = await db
//       .insert(bookings)
//       .values({
//         userId: req.user.userId,
//         apartmentId,
//         startDate: start,
//         endDate: end,
//         contractText,
//         contractUrl,
//         status: "pending",
//       })
//       .returning();
//     res.status(201).json({
//       message: "Booking created successfully",
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getBookings: RequestHandler = async (
//   req: CustomRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const { status, page = 1, limit = 10 } = req.query;
//     const offset = (Number(page) - 1) * Number(limit);
//     // Base query conditions
//     let conditions = [];
//     // For renters, only show their own bookings
//     if (req.user.role === "renter") {
//       conditions.push(eq(bookings.userId, req.user.userId));
//     }
//     // For owners, show bookings for their apartments
//     if (req.user.role === "owner") {
//       const ownerApartments = await db
//         .select({ id: apartments.id })
//         .from(apartments)
//         .where(eq(apartments.ownerId, req.user.userId));
//       if (ownerApartments.length === 0) {
//         res.status(200).json({ bookings: [], pagination: { total: 0 } });
//         return;
//       }
//       conditions.push(
//         inArray(
//           bookings.apartmentId,
//           ownerApartments.map((a) => a.id)
//         )
//       );
//     }
//     // Filter by status if provided
//     if (status) {
//       conditions.push(eq(bookings.status, String(status)));
//     }
//     // Get bookings
//     const bookingsList = await db
//       .select()
//       .from(bookings)
//       .where(conditions.length > 0 ? and(...conditions) : undefined)
//       .limit(Number(limit))
//       .offset(offset)
//       .orderBy(bookings.createdAt);
//     // Get count
//     const totalCount = await db
//       .select({ count: count() })
//       .from(bookings)
//       .where(conditions.length > 0 ? and(...conditions) : undefined)
//       .then((res) => res[0]?.count || 0);
//     // Get related apartment and user info
//     const enrichedBookings = await Promise.all(
//       bookingsList.map(async (booking) => {
//         const [apartment] = await db
//           .select()
//           .from(apartments)
//           .where(eq(apartments.id, booking.apartmentId))
//           .limit(1);
//         const [user] = await db
//           .select({ id: users.id, name: users.name, email: users.email })
//           .from(users)
//           .where(eq(users.id, booking.userId))
//           .limit(1);
//         return {
//           ...booking,
//           apartment,
//           user,
//         };
//       })
//     );
//     res.status(200).json({
//       bookings: enrichedBookings,
//       pagination: {
//         total: totalCount,
//         page: Number(page),
//         limit: Number(limit),
//         totalPages: Math.ceil(totalCount / Number(limit)),
//       },
//     });
//   } catch (error) {
//     console.error("Error getting bookings:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getBookingById: RequestHandler = async (
//   req: CustomRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const { id } = req.params;
//     const [booking] = await db
//       .select()
//       .from(bookings)
//       .where(eq(bookings.id, Number(id)))
//       .limit(1);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     // Authorization check
//     if (req.user.role === "renter" && booking.userId !== req.user.userId) {
//       return res
//         .status(403)
//         .json({ message: "You can only view your own bookings" });
//     }
//     // For owners, check if booking is for their apartment
//     if (req.user.role === "owner") {
//       const [apartment] = await db
//         .select()
//         .from(apartments)
//         .where(eq(apartments.id, booking.apartmentId))
//         .limit(1);
//       if (!apartment || apartment.ownerId !== req.user.userId) {
//         return res
//           .status(403)
//           .json({ message: "You can only view bookings for your apartments" });
//       }
//     }
//     // Get related apartment and user info
//     const [apartment] = await db
//       .select()
//       .from(apartments)
//       .where(eq(apartments.id, booking.apartmentId))
//       .limit(1);
//     const [user] = await db
//       .select({ id: users.id, name: users.name, email: users.email })
//       .from(users)
//       .where(eq(users.id, booking.userId))
//       .limit(1);
//     const enrichedBooking = {
//       ...booking,
//       apartment,
//       user,
//     };
//     res.status(200).json({ booking: enrichedBooking });
//   } catch (error) {
//     console.error("Error getting booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const updateBooking: RequestHandler = async (
//   req: CustomRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const { id } = req.params;
//     const { status, contractText, contractUrl } = req.body as BookingUpdateData;
//     // Get the booking
//     const [booking] = await db
//       .select()
//       .from(bookings)
//       .where(eq(bookings.id, Number(id)))
//       .limit(1);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     // Authorization check
//     if (req.user.role === "renter") {
//       if (booking.userId !== req.user.userId) {
//         return res
//           .status(403)
//           .json({ message: "You can only update your own bookings" });
//       }
//       // Renters can only cancel bookings
//       if (status && status !== "cancelled") {
//         return res
//           .status(403)
//           .json({ message: "You can only cancel bookings" });
//       }
//     }
//     if (req.user.role === "owner") {
//       const [apartment] = await db
//         .select()
//         .from(apartments)
//         .where(eq(apartments.id, booking.apartmentId))
//         .limit(1);
//       if (!apartment || apartment.ownerId !== req.user.userId) {
//         return res.status(403).json({
//           message: "You can only update bookings for your apartments",
//         });
//       }
//       // Owners can't cancel bookings, only approve/reject
//       if (status && status === "cancelled") {
//         return res
//           .status(403)
//           .json({ message: "Owners cannot cancel bookings" });
//       }
//     }
//     // Update the booking
//     const [updatedBooking] = await db
//       .update(bookings)
//       .set({
//         status,
//         contractText,
//         contractUrl,
//       })
//       .where(eq(bookings.id, Number(id)))
//       .returning();
//     res.status(200).json({
//       message: "Booking updated successfully",
//       booking: updatedBooking,
//     });
//   } catch (error) {
//     console.error("Error updating booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getApartmentBookings: RequestHandler = async (req, res) => {
//   try {
//     const { apartmentId } = req.params;
//     const { startDate, endDate } = req.query;
//     // Validate apartment exists
//     const [apartment] = await db
//       .select()
//       .from(apartments)
//       .where(eq(apartments.id, Number(apartmentId)))
//       .limit(1);
//     if (!apartment) {
//       return res.status(404).json({ message: "Apartment not found" });
//     }
//     // Build conditions
//     const conditions = [eq(bookings.apartmentId, Number(apartmentId))];
//     // Filter by date range if provided
//     if (startDate && endDate) {
//       const start = new Date(String(startDate));
//       const end = new Date(String(endDate));
//       conditions.push(
//         or(
//           and(gte(bookings.startDate, start), lte(bookings.startDate, end)),
//           and(gte(bookings.endDate, start), lte(bookings.endDate, end)),
//           and(lte(bookings.startDate, start), gte(bookings.endDate, end))
//         )
//       );
//     }
//     // Get approved bookings only for availability check
//     conditions.push(
//       or(eq(bookings.status, "approved"), eq(bookings.status, "pending"))
//     );
//     const bookingsList = await db
//       .select()
//       .from(bookings)
//       .where(and(...conditions))
//       .orderBy(bookings.startDate);
//     res.status(200).json({ bookings: bookingsList });
//   } catch (error) {
//     console.error("Error getting apartment bookings:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
