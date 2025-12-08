import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string) {
  const input = text.replace("\n", " ");

  const geminiModel = google.textEmbedding("gemini-embedding-001");
  const { embedding } = await embed({
    model: geminiModel,
    value: input,
  });
  return embedding;
}

export async function generateEmbeddings(texts: string[]) {
  const inputs = texts.map((text) => text.replace("\n", " "));

  const geminiModel = google.textEmbedding("gemini-embedding-001");

  const { embeddings } = await embedMany({
    model: geminiModel,
    values: inputs,
  });
  return embeddings;
}
