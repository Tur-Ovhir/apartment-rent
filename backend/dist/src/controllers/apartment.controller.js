"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerApartments = exports.deleteApartment = exports.updateApartment = exports.getApartmentById = exports.getApartments = exports.createApartment = void 0;
const database_1 = __importDefault(require("../database"));
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== "owner") {
            res.status(403).json({ message: "Only owners can create apartments" });
            return;
        }
        const { title, price, rooms, bathrooms, area, builtYear, floor, isFurnished, isHighlight, facing, description, location, latitude, longitude, interiorCategory, otherCategory, images, } = req.body;
        // Validation
        if (!title ||
            !price ||
            !rooms ||
            !bathrooms ||
            !area ||
            !location ||
            !latitude ||
            !longitude) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        if (price <= 0 || rooms <= 0 || bathrooms <= 0 || area <= 0) {
            res.status(400).json({ message: "Numeric values must be positive" });
            return;
        }
        // Create apartment transaction
        const [newApartment] = yield database_1.default
            .insert(schema_1.apartments)
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
            ownerId: req.user.userId,
        })
            .returning();
        // Add images if provided
        if (images && images.length > 0) {
            yield database_1.default.insert(schema_1.apartmentImages).values(images.map((imageUrl) => ({
                apartmentId: newApartment.id,
                imageUrl,
            })));
        }
        // Get the apartment with images
        const apartmentWithImages = yield getApartmentWithImages(newApartment.id);
        res.status(201).json({
            message: "Apartment created successfully",
            apartment: apartmentWithImages,
        });
    }
    catch (error) {
        console.error("Error creating apartment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createApartment = createApartment;
const getApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minPrice, maxPrice, minRooms, maxRooms, minArea, maxArea, isHighlight, facing, interiorCategory, otherCategory, search, page = 1, limit = 10, } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        // Build filter conditions
        const conditions = [
            minPrice ? (0, drizzle_orm_1.gte)(schema_1.apartments.price, Number(minPrice)) : undefined,
            maxPrice ? (0, drizzle_orm_1.lte)(schema_1.apartments.price, Number(maxPrice)) : undefined,
            minRooms ? (0, drizzle_orm_1.gte)(schema_1.apartments.rooms, Number(minRooms)) : undefined,
            maxRooms ? (0, drizzle_orm_1.lte)(schema_1.apartments.rooms, Number(maxRooms)) : undefined,
            minArea ? (0, drizzle_orm_1.gte)(schema_1.apartments.area, Number(minArea)) : undefined,
            maxArea ? (0, drizzle_orm_1.lte)(schema_1.apartments.area, Number(maxArea)) : undefined,
            isHighlight !== undefined
                ? (0, drizzle_orm_1.eq)(schema_1.apartments.isHighlight, isHighlight === "true")
                : undefined,
            facing ? (0, drizzle_orm_1.eq)(schema_1.apartments.facing, String(facing)) : undefined,
            interiorCategory
                ? (0, drizzle_orm_1.eq)(schema_1.apartments.interiorCategory, String(interiorCategory))
                : undefined,
            otherCategory
                ? (0, drizzle_orm_1.eq)(schema_1.apartments.otherCategory, String(otherCategory))
                : undefined,
            search
                ? (0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.apartments.title, `%${search}%`), (0, drizzle_orm_1.like)(schema_1.apartments.location, `%${search}%`), (0, drizzle_orm_1.like)(schema_1.apartments.description, `%${search}%`))
                : undefined,
        ].filter(Boolean);
        // Get apartments
        const apartmentsList = yield database_1.default
            .select()
            .from(schema_1.apartments)
            .where(conditions.length > 0 ? (0, drizzle_orm_1.and)(...conditions) : undefined)
            .limit(Number(limit))
            .offset(offset);
        // Get count
        const totalCount = yield database_1.default
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(schema_1.apartments)
            .where(conditions.length > 0 ? (0, drizzle_orm_1.and)(...conditions) : undefined)
            .then((res) => { var _a; return ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.count) || 0; });
        // Get images for each apartment
        const apartmentIds = apartmentsList.map((a) => a.id);
        const images = apartmentIds.length > 0
            ? yield database_1.default
                .select()
                .from(schema_1.apartmentImages)
                .where((0, drizzle_orm_1.inArray)(schema_1.apartmentImages.apartmentId, apartmentIds))
            : [];
        // Combine apartments with their images
        const apartmentsWithImages = apartmentsList.map((apartment) => (Object.assign(Object.assign({}, apartment), { images: images
                .filter((img) => img.apartmentId === apartment.id)
                .map((img) => img.imageUrl) })));
        res.status(200).json({
            apartments: apartmentsWithImages,
            pagination: {
                total: totalCount,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(totalCount / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error getting apartments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getApartments = getApartments;
const getApartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const apartmentWithImages = yield getApartmentWithImages(Number(id));
        if (!apartmentWithImages) {
            res.status(404).json({ message: "Apartment not found" });
            return;
        }
        res.status(200).json({ apartment: apartmentWithImages });
    }
    catch (error) {
        console.error("Error getting apartment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getApartmentById = getApartmentById;
const updateApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { id } = req.params;
        const updateData = req.body;
        // Check if apartment exists
        const [existingApartment] = yield database_1.default
            .select()
            .from(schema_1.apartments)
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.id, Number(id)))
            .limit(1);
        if (!existingApartment) {
            res.status(404).json({ message: "Apartment not found" });
            return;
        }
        // Authorization check
        if (req.user.role === "owner" &&
            existingApartment.ownerId !== req.user.userId) {
            res
                .status(403)
                .json({ message: "You can only update your own apartments" });
            return;
        }
        // Transaction for updating apartment and images
        const [updatedApartment] = yield database_1.default
            .update(schema_1.apartments)
            .set(Object.assign({}, updateData))
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.id, Number(id)))
            .returning();
        if (updateData.images) {
            yield database_1.default
                .delete(schema_1.apartmentImages)
                .where((0, drizzle_orm_1.eq)(schema_1.apartmentImages.apartmentId, Number(id)));
            if (updateData.images.length > 0) {
                yield database_1.default.insert(schema_1.apartmentImages).values(updateData.images.map((imageUrl) => ({
                    apartmentId: Number(id),
                    imageUrl,
                })));
            }
        }
        // Get the updated apartment with images
        const apartmentWithImages = yield getApartmentWithImages(Number(id));
        res.status(200).json({
            message: "Apartment updated successfully",
            apartment: apartmentWithImages,
        });
    }
    catch (error) {
        console.error("Error updating apartment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateApartment = updateApartment;
const deleteApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { id } = req.params;
        // Check if apartment exists
        const [existingApartment] = yield database_1.default
            .select()
            .from(schema_1.apartments)
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.id, Number(id)))
            .limit(1);
        if (!existingApartment) {
            res.status(404).json({ message: "Apartment not found" });
            return;
        }
        // Authorization check
        if (req.user.role !== "admin" &&
            existingApartment.ownerId !== req.user.userId) {
            res
                .status(403)
                .json({ message: "Unauthorized to delete this apartment" });
            return;
        }
        // Transaction to delete apartment and its images
        yield database_1.default
            .delete(schema_1.apartmentImages)
            .where((0, drizzle_orm_1.eq)(schema_1.apartmentImages.apartmentId, Number(id)));
        yield database_1.default.delete(schema_1.apartments).where((0, drizzle_orm_1.eq)(schema_1.apartments.id, Number(id)));
        res.status(200).json({ message: "Apartment deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting apartment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteApartment = deleteApartment;
const getOwnerApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const ownerApartments = yield database_1.default
            .select()
            .from(schema_1.apartments)
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.ownerId, req.user.userId))
            .limit(Number(limit))
            .offset(offset);
        // Get count
        const totalCount = yield database_1.default
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(schema_1.apartments)
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.ownerId, req.user.userId))
            .then((res) => { var _a; return ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.count) || 0; });
        // Get images for these apartments
        const apartmentIds = ownerApartments.map((a) => a.id);
        const images = apartmentIds.length > 0
            ? yield database_1.default
                .select()
                .from(schema_1.apartmentImages)
                .where((0, drizzle_orm_1.inArray)(schema_1.apartmentImages.apartmentId, apartmentIds))
            : [];
        // Combine apartments with their images
        const apartmentsWithImages = ownerApartments.map((apartment) => (Object.assign(Object.assign({}, apartment), { images: images
                .filter((img) => img.apartmentId === apartment.id)
                .map((img) => img.imageUrl) })));
        res.status(200).json({
            apartments: apartmentsWithImages,
            pagination: {
                total: totalCount,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(totalCount / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error getting owner apartments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOwnerApartments = getOwnerApartments;
// Helper function to get apartment with its images
function getApartmentWithImages(apartmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [apartment] = yield database_1.default
            .select()
            .from(schema_1.apartments)
            .where((0, drizzle_orm_1.eq)(schema_1.apartments.id, apartmentId))
            .limit(1);
        if (!apartment)
            return null;
        const images = yield database_1.default
            .select()
            .from(schema_1.apartmentImages)
            .where((0, drizzle_orm_1.eq)(schema_1.apartmentImages.apartmentId, apartmentId));
        return Object.assign(Object.assign({}, apartment), { images: images.map((img) => img.imageUrl) });
    });
}
