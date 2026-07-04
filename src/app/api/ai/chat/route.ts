import { NextRequest, NextResponse } from "next/server";
import { askAI } from "@/lib/ai";
import { systemPrompt } from "@/lib/ai/systemPrompt";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!Array.isArray(messages)) {
            return NextResponse.json(
                {
                    error: "Messages are required.",
                },
                {
                    status: 400,
                }
            );
        }

        const reply = await askAI([
            {
                role: "system",
                content: systemPrompt,
            },
            ...messages,
        ]);

        return NextResponse.json({
            message: reply,
        });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                error: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}