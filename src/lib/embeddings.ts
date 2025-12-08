import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string) {
  const input = text.replace("\n", " ");

  const { embedding } = await embed({
    model: "gemini-embedding-001",
    value: input,
  });
  return embedding;
}
