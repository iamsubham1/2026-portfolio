import Groq from "groq-sdk";
import { ChatMessage } from "./types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAI(messages: ChatMessage[]) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages,
  });

  return completion.choices[0].message.content ?? "";
}