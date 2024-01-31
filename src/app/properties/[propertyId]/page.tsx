"use client";

import Button from "~/app/_components/Button";
import Container from "~/app/_components/Container";
import Input from "~/app/_components/Inputs/Input";
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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <div className="flex flex-row items-center gap-1 p-4">
                  <div className="text-xl font-semibold">
                    KSh {property.price}
                  </div>
                  <div className="font-light text-neutral-600">monthly</div>
                </div>
                <hr />
                <div className="flex flex-row items-center gap-1 p-4">
                  <div className="text-lg font-semibold">{property.type}</div>
                </div>
                <hr />
                <div className="sticky bottom-0">
                  <div className="flex flex-col gap-5 p-4">
                    <div className="text-lg font-semibold">
                      Contact the seller
                    </div>
                    <textarea
                      className="h-1/3 rounded-xl border px-2 py-4
                        hover:border-2 hover:border-gray-900/30 focus:border-gray-900/40"
                      rows={8}
                      placeholder="Leave your message here ..."
                    />
                    <Button
                      label="Send"
                      onClick={() => console.log("You called>>")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
