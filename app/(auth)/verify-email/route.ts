import { verifyToken } from "@/app/actions/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  console.log(token, email, "token and email in route handler");
  if (!token || !email) {
    // Use NextResponse to send a proper Response object
    return NextResponse.json(
      { message: "Invalid Link" },
      { status: 400 }
    );
  }
  await verifyToken(token, email);
  return NextResponse.redirect("/");
}
