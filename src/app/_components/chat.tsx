"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChat } from "ai/react";
import { action } from "./chat-action";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: action,
  });

  return (
    <div className="container mx-auto p-4">
      <form
        className="flex gap-2 w-full pb-2 border-b-slate-700 border-b items-center"
        onSubmit={handleSubmit}
      >
        <Label className="text-xl whitespace-nowrap">Question</Label>
        <Input
          className="w-full"
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
        <Button type="submit">Send</Button>
      </form>
      <ul>
        {messages.map((m, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: no unique key exists
          <li key={index} className="mt-3 font-bold text-xl">
            {m.role === "user" ? "User: " : "AI: "}
            {m.role === "user" ? m.content : m.ui}
          </li>
        ))}
      </ul>
    </div>
  );
}
