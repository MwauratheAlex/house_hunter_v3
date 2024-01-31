import React from "react";
import { ILocation } from "~/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface IPropertyHead {
  title: string;
  location: ILocation;
  imageSrc: string;
  id: string;
}

export default function propertyHead(props: IPropertyHead) {
  return (
    <>
      <Heading title={props.title} subtitle={props.location.name} />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          fill
          src={props.imageSrc}
          alt={`A property named ${props.title} located in ${props.location.name}`}
        />
        <div className="absolute right-5 top-5">
          <HeartButton />
        </div>
      </div>
    </>
  );
}
