import { env } from "@/config/env";
import { OpenAI } from "openai";

export const openAiClient = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
