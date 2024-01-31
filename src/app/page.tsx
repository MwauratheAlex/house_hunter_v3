import { unstable_noStore as noStore } from "next/cache";

import { api } from "~/trpc/server";
import Container from "./_components/Container";
import ListingCard from "./_components/listings/ListingCard";

export default async function Home() {
  noStore();
  const properties = await api.property.getAll.query();

  return (
    <main>
      <Container>
        <div
          className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          {properties.map((property) => (
            <ListingCard
              title={property.title}
              propertyId={property.id}
              imageSrc={property.imageSrc}
              price={property.price}
              type={property.type}
              location={property.location}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
