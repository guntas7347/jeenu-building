"use server";

import prisma from "@/lib/prisma";
import { getSessionUser } from "../auth";

export const getQueries = async (
  markAsRead: boolean = false,
  page: number = 1,
  limit: number = 25,
) => {
  try {
    const skip = (page - 1) * limit;

    const whereClause = markAsRead !== undefined ? { markAsRead } : {};

    const [queries, totalCount] = await Promise.all([
      prisma.query.findMany({
        skip,
        take: limit,
        where: whereClause,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          listing: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.query.count({
        where: whereClause,
      }),
    ]);

    return {
      data: queries,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching queries:", error);
    throw new Error("Failed to fetch queries");
  }
};

export const markQueryReplied = async (id: string) => {
  const query = await prisma.query.update({
    where: { id },
    data: { markAsRead: true },
  });
  return query;
};

export const createQuery = async (data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  listingId: string;
}) => {
  try {
    let userId: string;

    const session = await getSessionUser();
    if (session?.id) {
      userId = session.id;
    } else {
      const email = data.email?.trim().toLowerCase();
      if (!email) {
        throw new Error("Email is required to submit an inquiry.");
      }

      // Upsert a user record for guest submissions
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name: data.name?.trim() || undefined,
          phone: data.phone?.trim() || undefined,
        },
        create: {
          email,
          name: data.name?.trim() || "Guest Inquirer",
          phone: data.phone?.trim() || null,
        },
      });
      userId = user.id;
    }

    const query = await prisma.query.create({
      data: {
        listingId: data.listingId,
        message: data.message?.trim() || "I am interested in this property build.",
        phone: data.phone?.trim() || null,
        userId,
      },
    });

    return query;
  } catch (error) {
    console.error("Error creating inquiry:", error);
    throw error;
  }
};
