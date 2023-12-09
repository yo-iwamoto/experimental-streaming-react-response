"use server";

import { openAiClient } from "@/lib/openai";
import { OpenAIStream, experimental_StreamingReactResponse, Message } from "ai";

export async function action({ messages }: { messages: Message[] }) {
  const res = await openAiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });
  const stream = OpenAIStream(res);

  return new experimental_StreamingReactResponse(stream, {
    ui: async (params) => {
      return <div className="py-2">{params.content}</div>;
    },
  });
}
