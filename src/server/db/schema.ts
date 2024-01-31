// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator(
  (name) => `house_hunter_v3_${name}`,
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  hashedPassword: varchar("hashedPassword", { length: 255 }),
  image: varchar("image", { length: 255 }),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
//   sessions: many(sessions),
// }));

export const properties = createTable("property", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  description: varchar("description", { length: 500 }).notNull(),
  price: int("price").notNull(),
  roomCount: int("roomCount").notNull(),
  category: mysqlEnum("category", ["rent", "sale"]).notNull(),
  imageSrc: varchar("imgSrc", { length: 256 }).notNull(),
  location: json("location").$type<{ lat: number; lng: number }>().notNull(),
  type: mysqlEnum("type", [
    "apartment",
    "house",
    "single-room",
    "bedsitter",
  ]).notNull(),
});

export const propertyRelations = relations(properties, ({ one, many }) => ({
  user: one(users, { fields: [properties.userId], references: [users.id] }),
  propertyAmenities: many(propertyAmenities),
}));

export const amenities = createTable("amenity", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 500 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const amenityRelations = relations(amenities, ({ many }) => ({
  propertyAmenities: many(propertyAmenities),
}));

export const propertyAmenities = createTable(
  "propertyAmenity",
  {
    propertyId: varchar("propertyId", { length: 255 }).notNull(),
    amenityId: varchar("amenityId", { length: 256 }).notNull(),
  },
  (propertyAmenity) => ({
    compoundKey: primaryKey({
      columns: [propertyAmenity.propertyId, propertyAmenity.amenityId],
    }),
    propertyIdIdx: index("propertyAmenities_propertyId_idx").on(
      propertyAmenity.propertyId,
    ),
  }),
);

export const propertyAmenitiesRelations = relations(
  propertyAmenities,
  ({ one }) => ({
    property: one(properties, {
      fields: [propertyAmenities.propertyId],
      references: [properties.id],
    }),
    amenity: one(amenities, {
      fields: [propertyAmenities.amenityId],
      references: [amenities.id],
    }),
  }),
);
