// import { NextRequest, NextResponse } from "next/server"
// import dbConnect from "@/lib/dbConnect";

// export async function GET(req: NextRequest, { params }: {
//     params: Promise<{
//         username: string
//     }>
    
// }) {
//     try {
//         await dbConnect();
// const username =  await params;
// if(!username)
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: "Retry Again!",
//             },
//             {
//                 status: 500,
//             },
//         );
//     }
// }