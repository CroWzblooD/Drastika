import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorExtension from "./EditorExtension";

function TextEditor({ selectedText }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose prose-brown max-w-none focus:outline-none p-6",
      },
    },
  });

  return (
    <div className="h-full bg-white flex flex-col">
      <EditorExtension 
        editor={editor} 
        selectedText={selectedText}
      />
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto py-6">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
