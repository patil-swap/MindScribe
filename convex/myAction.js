import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";

const googleApiKey = "AIzaSyD82C5hoKJDDOGiWdbTw-rt1-rDzERmW-c";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      { fileId: args.fileId },
      new GoogleGenerativeAIEmbeddings({
        apiKey: googleApiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title"
      }),
      { ctx }
    );
  }
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: googleApiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title"
      }),
      { ctx }
    );

    const similarSearch = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);

    return JSON.stringify(similarSearch);
  }
});
