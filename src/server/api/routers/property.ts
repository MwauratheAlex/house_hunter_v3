import { PropertyInput } from "~/types";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { properties, propertyAmenities } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const propertyRouter = createTRPCRouter({
  create: publicProcedure
    .input(PropertyInput)
    .mutation(async ({ ctx, input }) => {
      const validatedInput = PropertyInput.safeParse(input);

      if (!validatedInput.success) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid input",
        });
      }

      const {
        userId,
        title,
        description,
        price,
        category,
        roomCount,
        imageSrc,
        location,
        amenities,
        type,
      } = validatedInput.data;
      const propertyId = createId();

      await ctx.db.insert(properties).values({
        id: propertyId,
        title,
        description,
        userId,
        price,
        roomCount,
        category,
        imageSrc,
        location,
        type,
      });

      await Promise.all(
        amenities.map(async (amenityId) => {
          await ctx.db.insert(propertyAmenities).values({
            propertyId,
            amenityId,
          });
        }),
      );
    }),
});
