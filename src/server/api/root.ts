import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { propertyRouter } from "./routers/property";
import { amenityRouter } from "./routers/amenity";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  property: propertyRouter,
  amenity: amenityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
