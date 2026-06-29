import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
    try {
        // if (req.method !== "GET") {
        //     return NextResponse.json({
        //         success: false,
        //         message: `Only "Get" is Allowed.`
        //     }, {
        //         status: 405
        //     })
        // }
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")
        const refreshToken = cookieStore.get("refreshToken")
        if (!accessToken && !refreshToken) {
            return NextResponse.json({
                success: false,
                message: "Access Denied/Invalid Request."
            }, {
                status: 404
            })
        }
        cookieStore.delete("accessToken")
        cookieStore.delete("refreshToken")
        return NextResponse.json({
            success: true,
            message: "Logout successfully"
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Retry Again!"
        }, {
            status: 500
        })
    }
}