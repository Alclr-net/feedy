import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { createMessageService } from "@/services/message.service";
import { updateUserMessageService } from "@/services/user.service";
import { findUserByUsernameAndEmailService } from "@/services/auth.service";

export async function POST(  req: NextRequest,
    { params }: { params: Promise<{ username: string }> }) {
    try {
        await dbConnect()
        const data = await req.json();
        const { username } = await params;
        if (!(data && username)) {
            return NextResponse.json(
                { success: false, message: "Data and User_id are not found." },
                { status: 404 }
            )
        }
        const user = await findUserByUsernameAndEmailService({ identifier: username });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }
        if (!user.isAcceptingMessages) {
            return NextResponse.json(
                { success: true, message: `${username} is not accepting messages.` },
                { status: 200 }
            );
        }
        const createdMessage = await createMessageService({
            content: data.content,
            createdAt: new Date()
        });
        if (!createdMessage) {
            return NextResponse.json(
                { success: false, message: "Message creation failed." },
                { status: 500 }
            );
        }
        const updateUser = await updateUserMessageService({
            username,
            messageId: createdMessage._id
        });
        if (!updateUser) {
            return NextResponse.json(
                { success: false, message: "User not updated" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: "Message sent successfully.", data: createdMessage },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Retry Again!" },
            { status: 500 }
        )
    }
}