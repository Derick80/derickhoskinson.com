import { NextRequest } from "next/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { create } from "../actions/cloudinary";
import { NextResponse } from "next/server";
import cloudinary, { UploadApiResponse } from "cloudinary";
import { getUser } from "../actions/auth";

// const NewImageSchema = z.object({
//     imageField: z.array(z.instanceof(File)).refine((files) => files.every((file) => file.size > 0),
//         'Image is required'),
//     userId: z.string({
//         required_error: 'User ID is required'
//     })
// })

export async function POST (request: Request) {
  const formData = await request.formData();
  const userData = await getUser();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.redirect("/login");
  }
  const results = await create(formData);
  if (!results) {
    return NextResponse.json({ message: "error" });
  }
  console.log(results, "results from cloudinary");
  return NextResponse.json({ message: "success" });
}
