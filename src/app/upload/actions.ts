"use server"; // run on server but can be called from client components

import { PDFParse } from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();
    if (!result || result.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    const chunks = await chunkContent(result);

    const embeddings = await generateEmbeddings(chunks);

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embeddings: embeddings[index],
    }));

    await db.insert(documents).values(records);
    return {
      success: true,
      message: `PDF processed successfully. Created ${records.length} chunks`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
