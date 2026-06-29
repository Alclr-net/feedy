// import { cookies } from "next/headers"
// import jwt from "jsonwebtoken";

// export async function getInitialData() {
//     try {
//         const cookieStore = await cookies()
//         const accessToken = cookieStore.get("accessToken")?.value;
//         .log("getInitialData - accessToken:", accessToken);
//         if (!accessToken) return null;
//         const secret = process.env.ACCESS_TOKEN_SECRET as string
//         const decodedToken: any = jwt.verify(accessToken, secret);
//         if (!decodedToken) return null;
//         return decodedToken;
//     } catch (error) {
//         return null;
//     }
// }