import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { userAcceptanceUpdationservice } from "@/services/user.service";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();
 if (!(data && id)) {
            return NextResponse.json(
                { success: false, message: "Data and User_id are not found." },
                { status: 404 },
            );
        }
        const updateUserAcceptance = await userAcceptanceUpdationservice({
            id,
            isAcceptingMessages: data.isAcceptingMessages,
        });
        if (!updateUserAcceptance) {
            return NextResponse.json(
                { success: false, message: "Acceptance not updated." },
                { status: 404 },
            );
        }
        return NextResponse.json(
            { success: true, message: "Acceptance updated successfully" },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Retry Again!" },
            { status: 500 },
        );
    }
}
