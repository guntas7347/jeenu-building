export interface Property {
  id: string; // The Firestore document ID (slug)
  title: string;
  location: string;
  price: string; // e.g "$14,500,000"
  status: "Active" | "Featured" | "Sold" | "Draft";
  beds: number;
  baths: number;
  sqft: string; // e.g "12,400"
  description: string;
  images: string[];
  createdAt: string;
}

export interface Query {
  id: string; // The Firestore document ID
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyString: string; // The Title of the property
  message: string;
  status: "New" | "Replied";
  date: string;
}
