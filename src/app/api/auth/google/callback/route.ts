import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import google from "@/helpers/google";
import * as arctic from "arctic";
import {
  searchByEmailService,
  createUserForOauthService,
} from "@/services/auth.service";
import { generateAccessAndRefreshToken } from "@/helpers/generateAccessAndRefreshToken";
import sendVerificationCode from "@/helpers/sendVerificationEmail";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedCode = req.cookies.get("code")?.value;
    const storedState = req.cookies.get("state")?.value;

    if (
      !code ||
      !state ||
      !storedCode ||
      !storedState ||
      state !== storedState
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 400 }
      );
    }
    const token = await google.validateAuthorizationCode(code, storedCode);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 400 }
      );
    }
    const userInfo: any = arctic.decodeIdToken(token.idToken());

    if (!userInfo) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 400 }
      );
    }
    const { email, name } = userInfo;
    const isUserExist = await searchByEmailService(email);
    if (isUserExist) {
      const { accessToken, refreshToken } = await
        generateAccessAndRefreshToken(isUserExist);
      isUserExist.refreshToken = refreshToken;
      await isUserExist.save({ validateBeforeSave: false });
      const response = NextResponse.redirect(req.nextUrl.origin)
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
      return response;
    }
    const username = name.toLowerCase();
    const user = await createUserForOauthService({
      username,
      email,
      isVerified: true,
      provider: "google",
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const response = NextResponse.redirect(req.nextUrl.origin)
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
