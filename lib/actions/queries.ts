"use server";

import prisma from "../prisma";

export const getQueries = async () => {
  const queries = await prisma.query.findMany({
    include: {
      user: true,
      listing: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return queries;
};

export const markQueryReplied = async (id: string) => {
  const query = await prisma.query.update({
    where: { id },
    data: { status: "REPLIED" },
  });
  return query;
};
