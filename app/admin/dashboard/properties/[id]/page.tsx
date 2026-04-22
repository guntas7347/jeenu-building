import PropertyForm from "./form";
import { Property } from "@/types";
import { getPropertyById } from "@/lib/firebase/services";

type Params = Promise<{ id: string }>;

export default async function PropertyEditorPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const isNew = id === "new";
  let property: Partial<Property> = {
    title: "",
    location: "",
    price: "",
    status: "Draft",
    beds: 1,
    baths: 1,
    sqft: "",
    description: "",
    images: [],
  };

  if (!isNew) {
    const fetched = await getPropertyById(id);
    if (fetched) {
      property = fetched;
    }
  }

  return <PropertyForm initialData={property} id={id} isNew={isNew} />;
}
