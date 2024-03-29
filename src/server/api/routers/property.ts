import { PropertyInput } from "~/types";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { properties, propertyAmenities } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

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

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.properties.findMany({
      with: {
        propertyAmenities: {
          columns: {
            propertyId: false,
            amenityId: false,
          },
          with: {
            amenity: {
              columns: { createdAt: false, updatedAt: false },
            },
          },
        },
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ propertyId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.properties.findFirst({
        where: (properties, { eq }) => eq(properties.id, input.propertyId),
        with: {
          propertyAmenities: {
            columns: {
              propertyId: false,
              amenityId: false,
            },
            with: {
              amenity: {
                columns: {
                  createdAt: false,
                  updatedAt: false,
                },
              },
            },
          },
        },
      });
    }),
});
