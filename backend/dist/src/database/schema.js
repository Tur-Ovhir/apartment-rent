"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = exports.bookings = exports.apartmentImages = exports.apartments = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// 🧑‍💼 Хэрэглэгчид
const users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    phoneNumber: (0, pg_core_1.text)("phone_number").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    // Түрээслүүлэгчдэд зориулсан нэмэлт талбарууд
    name: (0, pg_core_1.text)("name"),
    avatar: (0, pg_core_1.text)("avatar"),
    title: (0, pg_core_1.text)("title"),
    // Хэрэглэгчийн төрөл: 'renter' эсвэл 'owner'
    role: (0, pg_core_1.text)("role").notNull().default("renter"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.users = users;
// 🏢 Орон сууц
const apartments = (0, pg_core_1.pgTable)("apartments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(), // байрны нэр
    price: (0, pg_core_1.integer)("price").notNull(), // үнэ
    rooms: (0, pg_core_1.integer)("rooms").notNull(), // өрөөний тоо
    bathrooms: (0, pg_core_1.integer)("bathrooms").notNull(), // угаалгын өрөөний тоо
    area: (0, pg_core_1.integer)("area").notNull(), // м.кв хэмжээ
    builtYear: (0, pg_core_1.integer)("built_year").notNull(), // ашиглалтад орсон он
    floor: (0, pg_core_1.integer)("floor").notNull(), // давхар
    isFurnished: (0, pg_core_1.boolean)("is_furnished").notNull(), // тавилгатай эсэх
    isHighlight: (0, pg_core_1.boolean)("is_highlight").notNull(),
    facing: (0, pg_core_1.text)("facing"), // хаашаа харсан (зүүн, баруун, гэх мэт)
    description: (0, pg_core_1.text)("description"), // тайлбар
    location: (0, pg_core_1.text)("location").notNull(), // хаяг
    latitude: (0, pg_core_1.text)("latitude").notNull(), // газрын зургийн өргөрөг
    longitude: (0, pg_core_1.text)("longitude").notNull(), // газрын зургийн уртраг
    interiorCategory: (0, pg_core_1.text)("interiorCategory"), // ангилал (жишээ: luxury, affordable, studio гэх мэт)
    otherCategory: (0, pg_core_1.text)("otherCategory"),
    ownerId: (0, pg_core_1.integer)("owner_id")
        .notNull()
        .references(() => users.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.apartments = apartments;
// 🖼 Зураг
const apartmentImages = (0, pg_core_1.pgTable)("apartment_images", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    apartmentId: (0, pg_core_1.integer)("apartment_id")
        .notNull()
        .references(() => apartments.id),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
});
exports.apartmentImages = apartmentImages;
// 📅 Түрээсийн захиалга
const bookings = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => users.id),
    apartmentId: (0, pg_core_1.integer)("apartment_id").references(() => apartments.id),
    startDate: (0, pg_core_1.timestamp)("start_date").notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date").notNull(),
    status: (0, pg_core_1.text)("status").default("pending"),
    contractText: (0, pg_core_1.text)("contract_text"), // гэрээний текст хэлбэрээр хадгалах
    contractUrl: (0, pg_core_1.text)("contract_url"), // PDF/Doc холбоос (S3, Supabase storage гэх мэт)
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.bookings = bookings;
// 🌟 Үнэлгээ
const reviews = (0, pg_core_1.pgTable)("reviews", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => users.id),
    apartmentId: (0, pg_core_1.integer)("apartment_id").references(() => apartments.id),
    rating: (0, pg_core_1.integer)("rating").notNull(), // 1-5
    comment: (0, pg_core_1.text)("comment"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.reviews = reviews;
