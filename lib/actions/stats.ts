"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    // Run all three count queries simultaneously for maximum speed
    const [totalListings, totalQueries, totalUsers] = await Promise.all([
      prisma.listing.count(),
      prisma.query.count(),
      prisma.user.count(),
    ]);

    return {
      totalListings,
      totalQueries,
      totalUsers,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    // Return fallback zeroes if the database connection fails
    return {
      totalListings: 0,
      totalQueries: 0,
      totalUsers: 0,
    };
  }
}
