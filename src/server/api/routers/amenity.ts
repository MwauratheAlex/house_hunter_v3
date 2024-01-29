import { createTRPCRouter, publicProcedure } from "../trpc";

export const amenityRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.amenities.findMany({
      orderBy: (amenities, { desc }) => [desc(amenities.id)],
    });
  }),
});
