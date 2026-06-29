import { NextRequest, NextResponse } from "next/server";
import * as arctic from "arctic";
import github from "@/helpers/github";
export async function GET(req: NextRequest) {
  try {
    const state = arctic.generateState();
    const url = github.createAuthorizationURL(state, ["user:email"]);
    const redirect = NextResponse.redirect(url.toString());
    redirect.cookies.set({
      name: "github_state",
      value: state,
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    return redirect;
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
