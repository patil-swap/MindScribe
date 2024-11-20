import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: genAI,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title"
      }),
      { ctx }
    );
  }
});
