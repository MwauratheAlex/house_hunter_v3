import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import Container from "./_components/Container";
import ListingCard from "./_components/ListingCard";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const properties = await api.property.getAll.query();
  properties.map((property) => console.log(property.propertyAmenities));

  return (
    <main>
      <Container>
        <div
          className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          {new Array(24).fill(4).map((_, idx) => (
            <ListingCard idx={idx + 1} key={idx} />
          ))}
        </div>
      </Container>
    </main>
  );
}
