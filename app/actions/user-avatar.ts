"use server";

import prisma from "@/lib/prisma";

export const getUserImages = async (userId: string) => {
  return await prisma.userImage.findMany({
    where: {
      userId,
    },
  });
};
