import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication (keeping the existing structure)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// New schema for data generation options
export const generationOptions = z.object({
  country: z.enum(['russia', 'ukraine', 'poland', 'belarus']),
  recordsCount: z.number().min(1).max(1000),
  fields: z.object({
    name: z.boolean(),
    phone: z.boolean(),
    address: z.boolean(),
    passport: z.boolean(),
  }),
  nameOptions: z.object({
    firstName: z.boolean(),
    lastName: z.boolean(),
    patronymic: z.boolean(),
  }),
  genderRatio: z.number().min(0).max(100),
});

// Personal data schema
export const personData = z.object({
  id: z.number(),
  fullName: z.string(),
  phone: z.string(),
  address: z.string(),
  passport: z.string(),
});

// Export request schema
export const exportRequest = z.object({
  format: z.enum(['csv', 'txt']),
  data: z.array(personData),
  options: generationOptions,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GenerationOptions = z.infer<typeof generationOptions>;
export type PersonData = z.infer<typeof personData>;
export type ExportRequest = z.infer<typeof exportRequest>;
