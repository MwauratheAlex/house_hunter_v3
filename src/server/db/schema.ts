// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  mysqlTableCreator,
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
  title: varchar("name", { length: 256 }),
  userId: varchar("userId", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  description: varchar("description", { length: 500 }),
  price: int("price").notNull(),
  roomCount: int("roomCount"),
});

export const PropertyRelations = relations(properties, ({ one }) => ({
  user: one(users, { fields: [properties.userId], references: [users.id] }),
}));

export const Amenities = createTable("amenity", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 500 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const PropertyAmenities = createTable("propertyAmenity", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  propertyId: bigint("propertyId", { mode: "number" }).notNull(),
  amenityId: bigint("amenityId", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const PropertyAmenitiesRelations = relations(
  PropertyAmenities,
  ({ one }) => ({
    property: one(properties, {
      fields: [PropertyAmenities.propertyId],
      references: [properties.id],
    }),
    amenity: one(Amenities, {
      fields: [PropertyAmenities.amenityId],
      references: [Amenities.id],
    }),
  }),
);
