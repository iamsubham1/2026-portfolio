import Groq from "groq-sdk";
import { ChatMessage } from "./types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAI(messages: ChatMessage[]) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.3,
    reasoning_effort: "medium",
    messages,
  });

  return completion.choices[0].message.content ?? "";
}