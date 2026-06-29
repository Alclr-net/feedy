
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getUserMessages } from '@/services/user.service';

export async function GET(  req: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect()
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "User_Id required to fetch messages." },
                { status: 404 }
            )
        }
        const messages = await getUserMessages(id);
        if (!messages) {
            return NextResponse.json(
                { success: false, message: "Messages are not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { success: true, message: "Messages are fetched successfully.", data: messages },
            { status: 200 }
        )
    } catch (error) {
        NextResponse.json(
            { success: false, message: "Retry Again!" },
            { status: 500 }
        )
    }
}
