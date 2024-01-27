import { PropertyInput } from "~/types";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const propertyRouter = createTRPCRouter({
  create: publicProcedure.input(PropertyInput).mutation(({ ctx, input }) => {
    console.log(input);
  }),
});
