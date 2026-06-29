import { NextRequest, NextResponse } from "next/server";
import * as arctic from "arctic";
import google from "@/helpers/google";
export async function GET(req: NextRequest) {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scope = ["openid", "email", "profile"];
    const url = google.createAuthorizationURL(state, codeVerifier, scope);
    const redirect = NextResponse.redirect(url.toString());
    redirect.cookies.set({
      name: "state",
      value: state,
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    redirect.cookies.set({
      name: "code",
      value: codeVerifier,
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    return redirect;
  } catch (error){
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
