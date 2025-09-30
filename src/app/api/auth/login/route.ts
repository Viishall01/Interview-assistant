import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { loginUser } from "@/utils/authHelper";

export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();
        const { email, password }: { email: string; password: string } = await req.json();

        const { user, token }: { user: any; token: string } = await loginUser({ email, password });

        const response = NextResponse.json(
            { message: "Login successful", user },
            { status: 200 }
        );

        // @ts-ignore: cookies is available on NextResponse in Next.js API routes
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
