"use server";

import prisma from "@/lib/prisma";
import { revalidatePaths } from "../revalidatePath";
import { getSessionUser, requireAuth } from "../auth";

export async function getUserProfile() {
  try {
    const session = await requireAuth();

    if (!session.user) {
      return null;
    }

    // Fetch user and their saved listings relation
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        savedListings: {
          include: {
            listing: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

export async function updateUserProfile(data: {
  name: string;
  phone: string;
  bio: string;
}) {
  try {
    const session = await requireAuth();

    if (!session.user) {
      return { success: false, error: "User not found" };
    }
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        phone: data.phone,
        bio: data.bio,
      },
    });

    revalidatePaths(["/profile"]);
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export const getSavedListingsIds = async () => {
  try {
    const session = await requireAuth();

    if (!session.user) {
      return [];
    }

    const savedListingsIds = await prisma.savedListing.findMany({
      where: {
        userId: session.user.id,
      },
      select: { listingId: true },
    });

    return savedListingsIds.map((item) => item.listingId);
  } catch (error) {
    console.error("Failed to fetch saved listings:", error);
    return [];
  }
};

export const saveListing = async (listingId: string) => {
  try {
    const session = await requireAuth();

    if (!session.user) {
      return { success: false, error: "User not found" };
    }

    const savedListing = await prisma.savedListing.create({
      data: {
        userId: session.user.id,
        listingId,
      },
    });

    revalidatePaths(["/profile"]);
    return { success: true, savedListing };
  } catch (error) {
    console.error("Failed to save listing:", error);
    return { success: false, error: "Failed to save listing" };
  }
};

export const unSaveListing = async (listingId: string) => {
  try {
    const session = await requireAuth();

    if (!session.user) {
      return { success: false, error: "User not found" };
    }

    const savedListing = await prisma.savedListing.delete({
      where: {
        userId_listingId: {
          userId: session.user.id,
          listingId,
        },
      },
    });

    revalidatePaths(["/profile"]);
    return { success: true, savedListing };
  } catch (error) {
    console.error("Failed to unsave listing:", error);
    return { success: false, error: "Failed to unsave listing" };
  }
};
