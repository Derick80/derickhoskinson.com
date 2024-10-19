import { NextRequest } from "next/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { UploadImagesToCloudinary } from "../actions/cloudinary";
import { NextResponse } from "next/server";
import cloudinary, { UploadApiResponse } from "cloudinary";

// const NewImageSchema = z.object({
//     imageField: z.array(z.instanceof(File)).refine((files) => files.every((file) => file.size > 0),
//         'Image is required'),
//     userId: z.string({
//         required_error: 'User ID is required'
//     })
// })
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("imageField") as File[];
  const userId = formData.get("userId") as string;
  console.log(files, userId, "files and userId");

  return NextResponse.json({ message: "success" });
  // try { // put the files through a arrayBuffer to get the fileBuffer.
  //     const formData = await request.formData()
  //     const files = formData.getAll('imageField') as File[]
  //     const userId = formData.get('userId') as string
  //     for (const file of files) {
  //         const fileBuffer = await file.arrayBuffer()
  //         const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
  //             cloudinary.v2.uploader.upload_stream({
  //                 folder: 'blog_testing_24',
  //                 filename_override: file.name,
  //                 discard_original_filename: false,
  //                 use_filename: true,
  //                 unique_filename: false,
  //                 overwrite: true,
  //                 transformation: [{ quality: 'auto' }]
  //             }, (error, result) => {
  //                 if (error || !result) reject(error)
  //                 else resolve(result)

  //             },
  //             ).end(Buffer.from(fileBuffer))

  //         })
  //         return Response.json(uploadResult)
  //     }
  // } catch (error) {
  //     console.error(error, 'error in cloudinary upload')
  //     return Response.json({ error: 'Error uploading image' }, { status: 500 })
  // }
}
