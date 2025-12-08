import { chunkContent } from "@/lib/chunking";
import { generateEmbeddings } from "@/lib/embeddings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const result =
    "Send this embedding to a friend who you know is gonna be a multi-millionare in the coming years";

  const chunks = await chunkContent(result);
  console.log({ chunks });

  const embeddings = await generateEmbeddings(chunks);
  console.log({ embeddings });
  const records = chunks.map((chunk, index) => ({
    content: chunk,
    embeddings: embeddings[index],
  }));

  return NextResponse.json(records);
}
