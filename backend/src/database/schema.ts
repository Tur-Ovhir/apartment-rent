import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// 🧑‍💼 Хэрэглэгчид
const users = pgTable("users", {
  id: serial("id").primaryKey(),

  phoneNumber: text("phone_number").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  // Түрээслүүлэгчдэд зориулсан нэмэлт талбарууд
  name: text("name"),
  avatar: text("avatar"),
  title: text("title"),

  // Хэрэглэгчийн төрөл: 'renter' эсвэл 'owner'
  role: text("role").notNull().default("renter"),

  createdAt: timestamp("created_at").defaultNow(),
});

// 🏢 Орон сууц
const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(), // байрны нэр
  price: integer("price").notNull(), // үнэ
  rooms: integer("rooms").notNull(), // өрөөний тоо
  bathrooms: integer("bathrooms").notNull(), // угаалгын өрөөний тоо
  area: integer("area").notNull(), // м.кв хэмжээ
  builtYear: integer("built_year").notNull(), // ашиглалтад орсон он
  floor: integer("floor").notNull(), // давхар
  isFurnished: boolean("is_furnished").notNull(), // тавилгатай эсэх
  facing: text("facing"), // хаашаа харсан (зүүн, баруун, гэх мэт)
  description: text("description"), // тайлбар

  location: text("location").notNull(), // хаяг
  latitude: text("latitude").notNull(), // газрын зургийн өргөрөг
  longitude: text("longitude").notNull(), // газрын зургийн уртраг

  interiorCategory: text("interiorCategory"), // ангилал (жишээ: luxury, affordable, studio гэх мэт)
  otherCategory: text("otherCategory"),

  ownerId: integer("owner_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});

// 🖼 Зураг
const apartmentImages = pgTable("apartment_images", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id")
    .notNull()
    .references(() => apartments.id),
  imageUrl: text("image_url").notNull(),
});

// 📅 Түрээсийн захиалга
const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),

  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  status: text("status").default("pending"),

  contractText: text("contract_text"), // гэрээний текст хэлбэрээр хадгалах
  contractUrl: text("contract_url"), // PDF/Doc холбоос (S3, Supabase storage гэх мэт)

  createdAt: timestamp("created_at").defaultNow(),
});

// 🌟 Үнэлгээ
const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export { users, apartments, apartmentImages, bookings, reviews };
