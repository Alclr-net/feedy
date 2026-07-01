import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserById } from "@/services/auth.service";
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ token: any }> }
) {
  try {
    await dbConnect();
    const { token } = await context.params;
    const cookiesStore: any = await  cookies();
    const cookie =  cookiesStore.get("accessToken");
    const incomingAccessToken = cookie.value
  
    if (!token) {
      throw new Error("Invalid request");
    }
    if (!incomingAccessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized request",
        },
        { status: 401 }
      );
    }
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const decodedToken: any = jwt.verify(incomingAccessToken, secret);

    const user: any = await getUserById(decodedToken._id);
    if (!user) {
      throw new Error("Inavlid request");
    }
    if (user.verifyCode.toString() !== token) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Token",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken = await user.generateAccessToken();
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    const response = NextResponse.json(
      {
        success: true,
        message: "User verified Successfully",
      },
      {
        status: 200,
      }
    );
    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    return response;
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
