"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "./auth";
import { redirect } from "next/navigation";

export const getUserImages = async (userId: string) => {
  return await prisma.userImage.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        userAvatar: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

export const starUserImage = async (imageId: string) => {
  const session = await verifySession();
  if (!session) redirect("login");
  const userId = session.userId;
  // Set all other images to false
  await prisma.userImage.updateMany({
    where: {
      userId: userId,
      userAvatar: true,
    },
    data: {
      userAvatar: false,
    },
  });

  // Set the selected image to true
  await prisma.userImage.update({
    where: {
      id: imageId, // Assuming 'id' is the unique identifier for userImage
    },
    data: {
      userAvatar: true,
    },
  });
};
