import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect";
import { searchByUserNameService } from "@/services/auth.service";

export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        username: string
    }>

}) {
    try {
        await dbConnect();
        const { username } = await params;
        if (!username) {
            return NextResponse.json(
                { success: true, message: "Username required to proceed." },
                { status: 404 }
            )
        }
        const IsUserNameExist = await searchByUserNameService(username);
        if (!IsUserNameExist) {
            return NextResponse.json(
                { success: false, message: "username is not existed." },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { success: true, message: "Username is existed." },
            { status: 200 }
        )
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