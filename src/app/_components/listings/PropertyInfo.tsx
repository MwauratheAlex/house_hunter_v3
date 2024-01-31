import { ILocation } from "~/types";
import Map from "../Map";

interface IPropertyInfo {
  category: string;
  location: ILocation;
  description: string;
  roomCount: number;
  amenities: any;
}

export const amenities = [
  {
    label: "balcony",
    //   icon: TbBeach,
    description: "Enjoy the sunsets and sunrises in your own balcony!",
  },
  {
    label: "swimming-pool",
    //   icon: GiWindmill,
    description:
      "Spend your hot afternoon in a swimming pool which comes with this property!",
  },
  {
    label: "cctv",
    //   icon: MdOutlineVilla,
    description:
      "Someone will always be watching out for you, keeping you secure!",
  },
  {
    label: "wifi",
    //   icon: MdOutlineVilla,
    description: "This property comes with super fast wifi!",
  },
];

export default function PropertyInfo(props: IPropertyInfo) {
  console.log(props.amenities);
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          "
        >
          <div>Posted by Mbugua</div>
        </div>
        <div
          className="
            flex flex-row items-center gap-4 font-light text-neutral-500"
        >
          <div>{props.roomCount} rooms</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap gap-4">
        {props.amenities.map(({ amenity }: any) => (
          <div>
            <div className="text-lg font-semibold text-gray-950/90">
              {amenity.name}
            </div>
            <div>
              {
                amenities.filter(
                  (localamenity) => localamenity.label === amenity.name,
                )[0]?.description
              }
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {props.description}
      </div>
      <hr />
      <Map mapCenter={{ lat: props.location.lat, lng: props.location.lng }} />
    </div>
  );
}
