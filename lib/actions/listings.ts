"use server";

import prisma from "../prisma";
import { revalidatePaths } from "../revalidatePath";

export const getListingById = async (id: string) => {
  return await prisma.listing.findUnique({
    where: { id },
  });
};

export const getListingBySlug = async (slug: string) => {
  return await prisma.listing.findUnique({
    where: { slug, status: { not: "DRAFT" } },
  });
};

export const updateListing = async (id: string, data: any) => {
  const updatedListing = await prisma.listing.update({
    where: { id },
    data,
  });
  revalidatePaths([
    `/admin/properties/`,
    `/admin/properties/${updatedListing.id}`,
    `/listings/${updatedListing.slug}`,
    `/listings/`,
  ]);
  return updatedListing;
};

export const createListing = async () => {
  // Generate a dynamic title so multiple drafts are easy to identify
  const draftTitle = `Draft Listing - ${new Date().toLocaleDateString()}`;

  const newListing = await prisma.listing.create({
    data: {
      title: draftTitle,
      slug: draftTitle.toLowerCase().replace(/\s+/g, "-"),
      description:
        "This is a sample property description. Please update this with the actual details of the estate.",
      propertyType: "Modern Villa",
      status: "DRAFT", // Keeps it hidden from public view
      badge: "New Draft",
      address: "123 Sample Street",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      pincode: "2000",

      price: 0,
      pricing: {},

      // Provide a placeholder image so the frontend gallery doesn't break
      images: [
        "https://placehold.co/800x600/f8fafc/94a3b8?text=Property+Placeholder",
      ],
      brochureUrl: "",
      floorPlanUrl: "",

      beds: 1,
      baths: 1,
      garages: 0,

      // Initialize the JSON object with the keys your frontend expects
      measurements: {
        totalSize: "0",
        builtUp: "0",
        carpet: "0",
      },

      features: ["Sample Feature 1", "Sample Feature 2"],
      inclusions: ["Sample Inclusion 1"],
      meta: {},
    },
  });

  revalidatePaths([`/admin/properties/`, `/admin/properties/${newListing.id}`]);

  return newListing;
};

export const getListings = async () => {
  return await prisma.listing.findMany({
    where: {
      status: {
        not: "DRAFT",
      },
    },
    orderBy: { updatedAt: "desc" },
  });
};

export const deleteListing = async (id: string) => {
  return await prisma.listing.delete({
    where: { id },
  });
};

export const createSampleListings = async () => {
  const listings = [
    {
      title: "Bondi Beachfront Villa",
      city: "Sydney",
      state: "NSW",
      price: 4200000,
      beds: 5,
      baths: 4,
      garages: 2,
      type: "Villa",
      sqft: { total: 4500, built: 3800, carpet: 3200 },
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      ],
    },
    {
      title: "Melbourne CBD Apartment",
      city: "Melbourne",
      state: "VIC",
      price: 950000,
      beds: 2,
      baths: 2,
      garages: 1,
      type: "Apartment",
      sqft: { total: 1100, built: 950, carpet: 850 },
      images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    },
    {
      title: "Brisbane Riverside House",
      city: "Brisbane",
      state: "QLD",
      price: 1800000,
      beds: 4,
      baths: 3,
      garages: 2,
      type: "House",
      sqft: { total: 3200, built: 2600, carpet: 2200 },
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"],
    },
    {
      title: "Perth Modern Condo",
      city: "Perth",
      state: "WA",
      price: 780000,
      beds: 2,
      baths: 2,
      garages: 1,
      type: "Condo",
      sqft: { total: 1000, built: 880, carpet: 800 },
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    },
    {
      title: "Adelaide Family Home",
      city: "Adelaide",
      state: "SA",
      price: 1250000,
      beds: 4,
      baths: 3,
      garages: 2,
      type: "House",
      sqft: { total: 2800, built: 2400, carpet: 2000 },
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    },
    {
      title: "Canberra Executive Townhouse",
      city: "Canberra",
      state: "ACT",
      price: 990000,
      beds: 3,
      baths: 2,
      garages: 2,
      type: "Townhouse",
      sqft: { total: 1900, built: 1600, carpet: 1400 },
      images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"],
    },
    {
      title: "Gold Coast Luxury Penthouse",
      city: "Gold Coast",
      state: "QLD",
      price: 3500000,
      beds: 4,
      baths: 4,
      garages: 3,
      type: "Penthouse",
      sqft: { total: 4200, built: 3500, carpet: 3000 },
      images: ["https://images.unsplash.com/photo-1494526585095-c41746248156"],
    },
    {
      title: "Hobart Waterfront Cottage",
      city: "Hobart",
      state: "TAS",
      price: 870000,
      beds: 3,
      baths: 2,
      garages: 1,
      type: "Cottage",
      sqft: { total: 1500, built: 1300, carpet: 1100 },
      images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e"],
    },
    {
      title: "Darwin Tropical Villa",
      city: "Darwin",
      state: "NT",
      price: 1100000,
      beds: 4,
      baths: 3,
      garages: 2,
      type: "Villa",
      sqft: { total: 2600, built: 2200, carpet: 1800 },
      images: ["https://images.unsplash.com/photo-1501183638710-841dd1904471"],
    },
    {
      title: "Newcastle Suburban Home",
      city: "Newcastle",
      state: "NSW",
      price: 980000,
      beds: 3,
      baths: 2,
      garages: 2,
      type: "House",
      sqft: { total: 2100, built: 1800, carpet: 1500 },
      images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
    },
  ];
  return await Promise.all(
    listings.map((item) =>
      prisma.listing.create({
        data: {
          title: item.title,
          slug: item.title.toLowerCase().replace(/\s+/g, "-"),
          description: `Premium ${item.type} located in ${item.city}. Ideal for modern living with top-tier amenities.`,
          propertyType: item.type,
          status: "AVAILABLE",
          badge: "Sample",
          address: "Sample Address",
          city: item.city,
          state: item.state,
          country: "Australia",
          pincode: "000000",

          price: item.price,
          pricing: {},

          images: item.images,
          brochureUrl: "",
          floorPlanUrl: "",

          beds: item.beds,
          baths: item.baths,
          garages: item.garages,

          measurements: {
            totalSize: item.sqft.total.toString(),
            builtUp: item.sqft.built.toString(),
            carpet: item.sqft.carpet.toString(),
          },

          features: ["Air Conditioning", "Parking", "Power Backup"],
          inclusions: ["Modular Kitchen", "Wardrobes"],
          meta: {},
        },
      }),
    ),
  );
};

const deleteAllListings = async () => {
  return await prisma.listing.deleteMany({});
};

// createSampleListings();

// deleteAllListings();
