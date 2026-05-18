import { clientEnv } from "@/lib/env/client.env";

export const PROPERTY_TYPES = ["Dual Key", "House", "Duplex"];
export const AUSTRALIAN_STATES = [
  "New South Wales",
  // "Victoria",
  "Queensland",
  // "Western Australia",
  "South Australia",
  // "Tasmania",
  // "Australian Capital Territory",
  // "Northern Territory",
];

export const CONTACT_NUMBER = "0488553500";
export const CONTACT_EMAIL = "contact@rohomes.com.au";
export const CONTACT_ADDRESS = "2-8 Brookhollow Ave, Norwest NSW 2153";

export const PROPERTY_STATUS = ["Available", "Sold"];

export const CLOUDINARY_CLOUD_NAME =
  clientEnv.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_UPLOAD_PRESET =
  clientEnv.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const LOCATIONIQ_KEY = clientEnv.NEXT_PUBLIC_LOCATIONIQ_KEY;
