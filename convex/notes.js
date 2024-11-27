import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addNotes = mutation({
  args: {
    fileId: v.string(),
    text: v.any(),
    createdBy: v.string()
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (record?.length == 0) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        text: args.text,
        createdBy: args.createdBy
      });
      return "Inserted new record!";
    } else {
      await ctx.db.patch(record[0]._id, { text: args.text });
    }
  }
});

export const getNotes = query({
  args: {
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return result[0]?.text;
  }
});
