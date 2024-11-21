import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  LucideListOrdered,
  Strikethrough,
  Subscript,
  Superscript,
  Underline
} from "lucide-react";
import React, { useCallback } from "react";

const EditorExtension = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    editor && (
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-3">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
              }
            >
              <Heading1 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
              }
            >
              <Heading2 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
              }
            >
              <Heading3 />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <BoldIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <Underline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "text-blue-500" : ""}
            >
              <Code />
            </button>
            <button onClick={addImage}>
              <ImageIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "text-blue-500" : ""}
            >
              <List />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "text-blue-500" : ""}
            >
              <LucideListOrdered />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
            >
              <Highlighter />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "text-blue-500" : ""}
            >
              <Strikethrough />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
              }
            >
              <AlignLeft />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
              }
            >
              <AlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
              }
            >
              <AlignRight />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive("subscript") ? "text-blue-500" : ""}
            >
              <Subscript />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive("superscript") ? "text-blue-500" : ""}
            >
              <Superscript />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditorExtension;
