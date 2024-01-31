"use client";

import Image from "next/image";
import { PropertyInputType } from "~/types";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";

type ListingCardProps = {
  property: Omit<PropertyInputType, "amenities">;
};

const ListingCard = ({ property }: ListingCardProps) => {
  const router = useRouter();
  return (
    <div
      className="group col-span-1 cursor-pointer "
      onClick={() => router.push(`/listings/${property.userId}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            className="h-full w-full object-cover transition group-hover:scale-110"
            fill
            src={property.imageSrc}
            alt={`Property: ${property.title} image`}
          />
          <div className="absolute right-3 top-3">
            <HeartButton />
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <div className="font-semibold">{property.title}</div>
          <div className="flex gap-4">
            <div className="text-black/60">{property.type},</div>
            <div className="text-black/60">Juja, Kenya</div>
          </div>
          <div className="font-semibold">Ksh.{property.price} per month</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
