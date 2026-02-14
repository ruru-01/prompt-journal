"use client";

import { useState } from "react";
import PromptDisplay from "../components/features/PromptDisplay";
import JournalEditor from "../components/features/JournalEditor";
import JournalCard from "@/components/features/JournalCard";

type JournalEntry = {
  id: string;
  prompt: string;
  content: string;
  createdAt: Date;
  aiFeedback?: {
    empathy: string;
    deepDive: string;
  };
}

export default function Home() {
  // 保存されたジャーナルのリストを管理する状態
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // フォームが送信されたときの処理
  const handleSave = async (content: string) => {

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ content, prompt: "今日、一番心が動いた瞬間は何ですか？" }),
      })

      const aiData = await response.json();

      const newEntry: JournalEntry = {
        id: crypto.randomUUID(), // ランダムなIDを生成
        prompt: "今日、一番心が動いた瞬間は何ですか？", // 今は固定
        content: content,
        createdAt: new Date(),
        aiFeedback: aiData,
    };

    // 既存のリストの先頭に新しいエントリを追加する
    setEntries([newEntry, ...entries]);
    } catch (error) {
      console.error("AI連携失敗", error);
    };
  }
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-12 border-b pb-4 text-center">
        <h1 className="text-3xl font-black tracking-tight">PromptJournal</h1>
      </header>

      <div className="space-y-12">
        {/* 入力エリア */}
        <section>
          <PromptDisplay question="今日、一番心が動いた瞬間は何ですか？" />
          <JournalEditor onSave={handleSave} />
        </section>

        {/* 履歴表示エリア */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-500 border-b pb-2">Previous Logs</h3>
          {entries.length === 0 ? (
            <p className="text-slate-400 text-center py-8 italic">
              まだ記録がありません。自分と対話してみましょう。
              </p>
          ) : (
            <div className="grid gap-6">
              {entries.map((entry) => (
                <JournalCard
                key={entry.id}
                date={entry.createdAt.toLocaleDateString()}
                question={entry.prompt}
                answer={entry.content}
                aiFeedback={entry.aiFeedback}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}