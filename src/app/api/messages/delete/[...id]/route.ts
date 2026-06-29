import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserById } from "@/services/auth.service";
import { deleteMessageService } from "@/services/message.service";
import { deleteUserMessageService } from "@/services/user.service";

export async function DELETE(
    req:NextRequest,{params}: {
    params: Promise<{ id: string[] }>;
}) {
    try {
        await dbConnect();

        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "User_id is required." },
                { status: 404 },
            );
        }
        const deletedMessage = await deleteMessageService(id[0]);
        if (!deletedMessage) {
            return NextResponse.json(
                { success: false, message: "Message not deleted yet." },
                { status: 404 },
            );
        }
        const updateUser = await deleteUserMessageService({
            userId: id[1],
            messageId: id[0],
        });
        if (!deleteUserMessageService) {
            return NextResponse.json(
                { success: false, message: "User message not deleted yet." },
                { status: 404 },
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "Message deleted successfully.",
                data: deletedMessage,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Retry Again!" },
            { status: 500 },
        );
    }
}
