import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { SignInValidationSchema } from "@/validators/signIn.validator";
import { findUserByUsernameAndEmailService } from "@/services/auth.service";
import { generateAccessAndRefreshToken } from "@/helpers/generateAccessAndRefreshToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();

    const parsedData = SignInValidationSchema.safeParse(data);
    if (!parsedData.success) {
      const error = parsedData.error.issues[0].message;
      return Response.json(
        {
          success: false,
          message: error,
        },
        {
          status: 400,
        }
      );
    }
    const user = await findUserByUsernameAndEmailService({
      identifier: parsedData.data.identifier,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 400,
        }
      );
    }
    const isPasswordValid = await user.isPasswordCorrect(
      parsedData.data.password
    );
    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Password is Incorrect.",
        },
        { status: 400 }
      );
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const response = NextResponse.json(
      {
        success: true,
        message: `Welcome back, ${user.username}!`,
        data:{
          username:user.username,
          isVerified:user.isVerified
        }
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
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    console.log(user)
    return response;
  } catch (error) {
    return NextResponse.json(
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
