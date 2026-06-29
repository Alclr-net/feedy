import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UsernameValidationSchema } from "@/validators/username.validator"
import { searchByUserNameService } from "@/services/auth.service";


export async function GET(req: NextRequest, {params}: {

    params: Promise<{ username: string }>;
}) {
    try {
        await dbConnect();
        const  username  = await params;
        console.log(username)
        const parsedData = UsernameValidationSchema.safeParse(username)
        if (!parsedData.success) {
            const error = parsedData.error.issues[0].message
            return NextResponse.json(
                {
                    success: false,
                    message: error

                },
                { status: 400 },)
        }
        const isUserExist = await searchByUserNameService(username.username!);
        if (!isUserExist) {
            return NextResponse.json(
                { success: false, message: "Username not exist." },
                { status: 404 }
            )
        }
        return NextResponse.json(
            {
                success: true,
                message: "User already exist.",
                data: isUserExist,
            },
            { status: 200 },
        );
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
