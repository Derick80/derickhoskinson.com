import { verifyToken } from "@/app/actions/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    // Use NextResponse to send a proper Response object
    return NextResponse.json(
      { message: "Invalid Link" },
      { status: 400 }
    );
  }

  try {
    await verifyToken(token, email);
  } catch (error) {
    // Handle token verification errors and respond accordingly
    return NextResponse.json(
      { message: "Verification failed", error: (error as Error).message },
      { status: 401 }
    );
  }

  // If successful, you can respond with whatever is needed
  // Log the cookie
  const sessionCookie = request.cookies.get("session-token");
  console.log(sessionCookie, "cookie in route handler");

  return NextResponse.json(
    { message: "Verification successful" },
    { status: 200 }
  );
}
