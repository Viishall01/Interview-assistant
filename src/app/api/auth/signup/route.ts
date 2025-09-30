import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { signupUser } from "@/utils/authHelper";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const { email, password, name, role } = await req.json();

    const { user, token } = await signupUser({ email, password, name, role });

    // Remove password from user object
    const { password: _, ...safeUser } = user.toObject ? user.toObject() : user;

    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: safeUser,
        token, //include token
      },
      { status: 201 }
    );

    // Set token as cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
