import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorExtension from "./EditorExtension";

const TextEditor = () => {
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

  return (
    <div>
      <EditorExtension editor={editor} />
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
