import { verifyToken } from "@/app/actions/auth";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return {
      status: 400,
      body: {
        message: "Invalid Link",
      },
    };
  }
  await verifyToken(token, email);

  // query is "hello" for /api/search?query=hello

  // log the cookie
  console.log(request.cookies.get("session-token"), "cookie in route handler");
}
