"use server";

import prisma from "@/lib/prisma";
import { FilterState } from "@/components/PropertyFilters";

export async function getFilteredListings(
  filters: FilterState,
  page: number = 1,
  limit: number = 9,
  sortBy: string = "Newest Listings",
) {
  try {
    // 1. Build the dynamic WHERE clause
    const where: any = {};

    // Exact matches
    if (filters.propertyType) where.propertyType = filters.propertyType;
    if (filters.status) where.status = filters.status;

    // Location (Search across city, state, or address)
    if (filters.location) {
      where.OR = [
        { city: { contains: filters.location, mode: "insensitive" } },
        { state: { contains: filters.location, mode: "insensitive" } },
        { address: { contains: filters.location, mode: "insensitive" } },
      ];
    }

    // Price filtering (Convert string inputs to BigInt Paisa)
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) {
        where.price.gte = BigInt(
          Math.round(parseFloat(filters.minPrice) * 100),
        );
      }
      if (filters.maxPrice) {
        where.price.lte = BigInt(
          Math.round(parseFloat(filters.maxPrice) * 100),
        );
      }
    }

    // Bedrooms & Bathrooms (Handle exact matches and "5+" logic)
    if (filters.beds) {
      where.beds = filters.beds.includes("+")
        ? { gte: parseInt(filters.beds) }
        : parseInt(filters.beds);
    }

    if (filters.baths) {
      where.baths = filters.baths.includes("+")
        ? { gte: parseInt(filters.baths) }
        : parseInt(filters.baths);
    }

    // 2. Build the Sorting logic
    let orderBy: any = { createdAt: "desc" }; // Default: Newest
    if (sortBy === "Price: Low to High") orderBy = { price: "asc" };
    if (sortBy === "Price: High to Low") orderBy = { price: "desc" };

    // 3. Execute query with Pagination
    const skip = (page - 1) * limit;

    const [listings, totalCount] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    // 4. Serialize BigInts and handle JSON filtering for Area
    // Note: Because Area is stored inside a JSON string field in your schema,
    // it's best to filter it in memory after fetching, or add an `areaSqft Int` column for better DB performance.
    let serializedListings = listings.map((listing) => ({
      ...listing,
      price: listing.price.toString(), // Convert BigInt to string for Client Components
    }));

    // In-memory filter for Area (since it's inside a JSON object)
    if (filters.minArea || filters.maxArea) {
      serializedListings = serializedListings.filter((listing) => {
        const measurements =
          typeof listing.measurements === "string"
            ? JSON.parse(listing.measurements)
            : (listing.measurements as any);

        const totalSize = parseInt(measurements?.totalSize || "0");
        const min = filters.minArea ? parseInt(filters.minArea) : 0;
        const max = filters.maxArea ? parseInt(filters.maxArea) : Infinity;

        return totalSize >= min && totalSize <= max;
      });
    }

    return {
      data: serializedListings,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching filtered listings:", error);
    throw new Error("Failed to fetch listings");
  }
}
