"use server";
import { z } from "zod";
import cloudinary from "cloudinary";
import { NextRequest } from "next/server";

const NewImageSchema = z.object({
  imageField: z
    .array(z.instanceof(File))
    .refine(
      (files) => files.every((file) => file.size > 0),
      "Image is required",
    ),
  userId: z.string({
    required_error: "User ID is required",
  }),
});

const cloudname = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudname || !apiKey || !apiSecret) {
  throw new Error("Missing cloudinary credentials");
}

cloudinary.v2.config({
  cloud_name: cloudname,
  api_key: apiKey,
  api_secret: apiSecret,
});

export const UploadImagesToCloudinary = async (
  files: File[],
  userId: string,
) => {
  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.v2.uploader.upload_stream(
        {
          folder: "blog_testing_24",
          filename_override: __filename,
          discard_original_filename: false,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          transformation: [{ quality: "auto" }],
        },
        (error, result) => {
          if (error) {
            throw error;
          }
          return result;
        },
      );
    }),
  );

  return uploadedImages;
};

export const uploadImages = async (formData: FormData) => {
  const files = formData.getAll("imageField") as File[];
  const userId = formData.get("userId") as string;
  // with a single file the next line would be const arrayBuffer = await file.arrayBuffer(). but I have multiple files
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: "blog_testing_24",
            filename_override: file.name,
            discard_original_filename: false,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ quality: "auto" }],
          },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          },
        )
        .end(Buffer.from(arrayBuffer));
    });
    return uploadResult;
  }
};

export const create = async (formData: FormData) => {
  const files = formData.getAll("imageField") as File[];
  const userId = formData.get("userId") as string;

  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: "blog_testing_24",
            filename_override: file.name,
            discard_original_filename: false,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ quality: "auto" }],
          },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });
  });
  // wait for files to upload
  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
};
