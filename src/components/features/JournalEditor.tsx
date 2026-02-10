"use client"

import { useState } from "react";
import Button from "../ui/Button";

export default function JournalEditor({ onSave }: { onSave: (content: string) => void }) {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (!text. trim()) return; // 空の入力は無視する
    onSave(text);
    setText(""); // 送信後に中身を空っぽにする
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none transition-all"
        placeholder="ここに自分の答えを書き留めましょう..."
      />
      <Button
        onClick={handleClick}
        variant="primary"
        size="md"
        disabled={!text.trim()}
      >
        記録する
      </Button>
    </div>
  );
}