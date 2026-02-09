"use client";

import { useState } from "react";
import PromptDisplay from "../components/features/PromptDisplay";
import JournalEditor from "../components/features/JournalEditor";

type JournalEntry = {
  id: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

export default function Home() {
  // 保存されたジャーナルのリストを管理する状態
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // フォームが送信されたときの処理
  const handleSave = (content: string) => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(), // ランダムなIDを生成
      prompt: "今日、新しく学んだことはなんですか？", // 今は固定
      content: content,
      createdAt: new Date(),
    };

    // 既存のリストの先頭に新しいエントリを追加する
    setEntries([newEntry, ...entries]);
  };

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
            <p className="text-slate-400 text-center py-8 italic">まだ記録がありません。自分と対話してみましょう。</p>
          ) : (
            <div className="grid gap-4">
              {entries.map((entry) => (
                <div key={entry.id} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">
                    {entry.createdAt.toLocaleDateString()}
                  </p>
                  <h4 className="font-semibold text-slate-800 mb-2 font-serif italic text-lg leading-snug">Q: {entry.prompt}</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
