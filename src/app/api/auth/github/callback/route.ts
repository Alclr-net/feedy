import { NextRequest, NextResponse } from "next/server";
import github from "@/helpers/github";
import dbConnect from "@/lib/dbConnect";
import {
  createUserForOauthService,
  searchByEmailService,
} from "@/services/auth.service";
import { generateAccessAndRefreshToken } from "@/helpers/generateAccessAndRefreshToken";
import sendVerificationCode from "@/helpers/sendVerificationEmail";
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const storedState = req.cookies.get("github_state")?.value;
    if (!state || !storedState || state !== storedState) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Request",
        },
        {
          status: 400,
        }
      );
    }
    const token = (
      await github.validateAuthorizationCode(code as string)
    ).accessToken();
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Request",
        },
        {
          status: 400,
        }
      );
    }
    const profileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const profile = await profileResponse.json();
    const emails = await emailsResponse.json();
    const [filteredEmails] = emails.filter((email: any) => email.primary);
    const isUserExist = await searchByEmailService(filteredEmails.email);
    if (isUserExist) {
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(isUserExist);
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
      return response
    }
    const username = profile.login.toLowerCase();
    const email = filteredEmails.email;
    const verifyCode: number = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const newExpiry: Date = new Date(now.getTime() + 60 * 60 * 1000);
    const user = await createUserForOauthService({
      username,
      email,
      verifyCode,
      codeExpiry: newExpiry,
      provider: "github",
    });
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    await sendVerificationCode(email, username, verifyCode);
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
    return NextResponse.redirect(new URL("/auth/success?provider=github", req.url));
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
