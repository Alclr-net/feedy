import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserById } from "@/services/auth.service";
import { generateAccessAndRefreshToken } from "@/helpers/generateAccessAndRefreshToken";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        if (accessToken) {
            const secret = process.env.ACCESS_TOKEN_SECRET as string;
            const decodedAccessToken: any = jwt.verify(accessToken, secret);
            const user = await getUserById(decodedAccessToken._id);
            if (!user) {
                return NextResponse.json(
                    { success: false, message: "User not found." },
                    { status: 404 },
                );
            }
            return NextResponse.json(
                { success: true, message: "Already Authorized", user },
                { status: 200 },
            );
        }
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (!refreshToken) {
            return NextResponse.json(
                { success: false, message: "Not Authenticated", user: null },
                { status: 404 },
            );
        }
        const secret = process.env.REFRESH_TOKEN_SECRET as string;
        const decodedRefreshToken: any = jwt.verify(refreshToken, secret);
        const user = await getUserById(decodedRefreshToken._id);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 },
            );
        }
        if (refreshToken !== user.refreshToken) {
            return NextResponse.redirect(new URL("/signIn", req.url));
        }
        const generatedToken = await generateAccessAndRefreshToken(user);
        user.refreshToken = generatedToken.refreshToken;
        user.save({ validateBeforeSave: false });
        const response = NextResponse.json(
            { success: true, message: "Authenticated", user: user },
            { status: 200 },
        );

        response.cookies.set({
            name: "accessToken",
            value: generatedToken.accessToken,
            httpOnly: true,
            path: "/",
            maxAge: 15 * 60,
        });
        response.cookies.set({
            name: "refreshToken",
            value: generatedToken.refreshToken,
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Retry Again!",
            },
            {
                status: 500,
            },
        );
    }
}
