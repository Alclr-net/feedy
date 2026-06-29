import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const mood = await req.json()
      console.log("mood",mood.mood)
        const messages = [
            {
                role: "system", content: "You are an AI that generates anonymous message suggestions. Generate exactly 5 unique anonymous messages. Each message must contain 10 words or fewer. Each message must express the user-provided mood. Do not repeat ideas or wording. Make every message natural and human. Avoid offensive hateful sexual explicit or illegal content. Every message must be a complete statement. Do not use commas inside any message. Do not use emojis hashtags numbering bullet points quotation marks explanations newlines or markdown. Output only one line with the three messages separated by a single comma and nothing else."
            }
            , { role: "user", content: `create message for the user with ${mood.mood} ` },

        ]
      
            const response = await fetch(" https://api.groq.com/openai/v1/chat/completions ", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "llama-3.3-70b-versatile",
                "messages": messages,

            })
        });
       const  data = await  response.json()
       console.log("data",data)
        return NextResponse.json(
            {
                success:true,
                message:"AI suggestion sent successfully",
                data: data.choices[0].message.content
            },{
                status:200
            }
        )
    } catch (error) {
        console.error("FULL ERROR:", error)  
        return NextResponse.json({
            success: false,
            message: "Retry Again!"
        }, {
            status: 500
        })
    }
}