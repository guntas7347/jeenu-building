"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "../auth";

export const getQueries = async (
  markAsRead: boolean = false,
  page: number = 1,
  limit: number = 25,
) => {
  try {
    const skip = (page - 1) * limit;

    // Build the where clause dynamically so you can fetch ALL, just READ, or just UNREAD
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

export const createQuery = async (data: any) => {
  const session = await requireAuth();

  if (!session.user) {
    return null;
  }

  const query = await prisma.query.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
  return query;
};
