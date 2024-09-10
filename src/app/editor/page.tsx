"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>("");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Markdown Editor</h1>

      {/* エディター部分 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Markdown Input</h2>
          <Textarea
            className="w-full h-64 p-4 border border-gray-300 rounded"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
          />
        </div>

        {/* プレビュー部分 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className="w-full h-64 p-4 border border-gray-300 rounded overflow-auto bg-white">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="mt-4">
        <Button onClick={() => alert("Article submitted!")}>Submit Article</Button>
      </div>
    </div>
  );
}
