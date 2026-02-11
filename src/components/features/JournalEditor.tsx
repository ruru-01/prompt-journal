"use client"

import { useState } from "react";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function JournalEditor({ onSave }: { onSave: (content: string) => void }) {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (!text. trim()) return; // 空の入力は無視する
    onSave(text);
    setText(""); // 送信後に中身を空っぽにする
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに自分の答えを書き留めましょう..."
        className="text-lg shadow-inner"
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