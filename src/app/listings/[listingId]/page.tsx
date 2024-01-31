import { api } from "~/trpc/server";

interface IParams {
  propertyId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const property = api.property.getById.query(params);
  return <div>ListingPage</div>;
}
