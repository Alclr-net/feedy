import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

import { getUserById } from "@/services/auth.service";
import sendVerificationCode from "@/helpers/sendVerificationEmail";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "User id is required." },
                { status: 404 }
            )

        }
        const user = await getUserById(id);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "user is not exist." }, { status: 404 }
            )
        }
        const date = Date.now();

        if (date > Number(user.codeExpiry)) {
            return NextResponse.json(
                { success: false, message: "Code expired." },
                { status: 400 }
            )
        }
        const newCode: number = Math.floor(100000 + Math.random() * 900000);
        const now = new Date();
        const newExpiry: Date = new Date(now.getTime() + 60 * 60 * 1000);
        user.verifyCode = newCode;
        user.codeExpiry = newExpiry;
        await user.save({ validateBeforeSave: false })
        await sendVerificationCode(user.email, user.username, user.verifyCode);
        return NextResponse.json(
            { success: true, message: "Verify code sended successfully" }, { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Retry Again!" },
            { status: 500 }
        )
    }
}  