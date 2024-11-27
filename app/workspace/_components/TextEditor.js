import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TextEditor = ({ fileId }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write Something...."
      })
    ],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class: "focus: outline-none h-screen p-5"
      }
    }
  });
  const notes = useQuery(api.notes.getNotes, {
    fileId: fileId
  });

  console.log(notes);

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes && editor]);

  return (
    <div className="bg-gray-700 text-white">
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
