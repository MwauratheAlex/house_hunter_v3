import { LatLng } from "use-places-autocomplete";
import { z } from "zod";

export const PropertyInput = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  location: z.object({
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  price: z.number(),
  category: z.enum(["rent", "sale"]),
  roomCount: z.number(),
  type: z.enum(["apartment", "house", "single-room", "bedsitter"]),
  amenities: z.array(z.string()),
});

export type PropertyInputType = z.infer<typeof PropertyInput>;

export type PropertyKeys = keyof PropertyInputType;

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export type RegisterUserSchemaKeys = keyof RegisterUserSchemaType;

export interface ILocation {
  name: string;
  lat: number;
  lng: number;
}
