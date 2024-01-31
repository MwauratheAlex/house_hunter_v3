"use client";

import Image from "next/image";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import { ILocation } from "~/types";

type ListingCardProps = {
  propertyId: string;
  imageSrc: string;
  title: string;
  price: number;
  type: string;
  location: ILocation;
};

const ListingCard = ({
  propertyId,
  imageSrc,
  title,
  price,
  type,
  location,
}: ListingCardProps) => {
  const router = useRouter();
  return (
    <div
      className="group col-span-1 cursor-pointer "
      onClick={() => router.push(`/properties/${propertyId}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            className="h-full w-full object-cover transition group-hover:scale-110"
            fill
            src={imageSrc}
            alt={`Property: ${title} image`}
          />
          <div className="absolute right-3 top-3">
            <HeartButton />
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <div className="font-semibold">{title}</div>
          <div className="flex gap-4">
            <div className="text-black/60">{type},</div>
            <div className="text-black/60">{location.name}</div>
          </div>
          <div className="font-semibold">Ksh.{price} per month</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
