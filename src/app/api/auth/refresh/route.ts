import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { getUserById } from "@/services/auth.service";
import { generateAccessAndRefreshToken } from "@/helpers/generateAccessAndRefreshToken";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const cookiesStore: any = await cookies();
    const cookie = cookiesStore.get("refreshToken");
    const incomingRefreshToken = cookie.value;
    if (!incomingRefreshToken) {
      return Response.json(
        {
          success: false,
          message: "Login Again!",
        },
        {
          status: 405,
        }
      );
    }
    const secret = process.env.REFRESH_TOKEN_SECRET as any;
    const decodedToken: any = jwt.verify(incomingRefreshToken, secret);
    const user: any = await getUserById(decodedToken._id);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "",
        },
        {
          status: 404,
        }
      );
    }
    if (incomingRefreshToken !== user.refreshToken) {
      throw new Error("Unauthorized request");
    }
const {refreshToken,accessToken}  = await generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    cookiesStore.set({
      name: "accessToken",
      value:accessToken,
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    cookiesStore.set({
      name: "refreshToken",
      value:refreshToken,
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return Response.json(
      {
        success: true,
        message: "Tokens refreshes successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Retry Again!",
      },
      {
        status: 500,
      }
    );
  }
}
