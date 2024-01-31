"use client";

import Container from "~/app/_components/Container";
import PropertyInfo from "~/app/_components/listings/PropertyInfo";
import PropertyHead from "~/app/_components/listings/propertyHead";
import { api } from "~/trpc/react";

interface IParams {
  propertyId: string;
}

export default function PropertyPage({ params }: { params: IParams }) {
  const {
    data: property,
    isLoading,
    isError,
  } = api.property.getById.useQuery(params);

  if (isLoading || !property) return null;

  if (isError)
    return (
      <Container>
        <div className="flex h-full w-full flex-col items-center gap-4 py-24 ">
          <p className="text-2xl font-semibold text-neutral-600">
            Something went wrong,
          </p>
          <p className="text-2xl font-semibold text-neutral-700">
            It's not you, it's us!
          </p>
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="mx-auto mt-4 max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <PropertyHead
            title={property.title}
            location={property.location}
            imageSrc={property.imageSrc}
            id={property.id}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <PropertyInfo
              category={property.category}
              description={property.description}
              roomCount={property.roomCount}
              location={property.location}
              amenities={property.propertyAmenities}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
