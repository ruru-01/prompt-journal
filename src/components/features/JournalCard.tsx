"use client";
import React, { useState, useRef, useEffect } from "react";

type JournalCardProps = {
  date: string;
  question: string;
  answer: string;
  aiFeedback?: {
    empathy: string;   // 共感メッセージ
    deepDive: string;  // 深掘り質問
  };
};

export default function JournalCard({ date, question, answer, aiFeedback }: JournalCardProps) {
  const [ reply, setReply ] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 入力に合わせて高さを自動調整する
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 一度高さをリセット
      textarea.style.height = `${textarea.scrollHeight}px`; // 内容に合わせて高さを調整
    }
  }

  // テキストエリアの内容が変わるたびに高さを調整する
  useEffect(() => {
    adjustTextareaHeight();
  }, [reply]);

  return (
    <div className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-indigo-400 tracking-widest">{date}</span>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="font-serif italic text-lg text-slate-800 leading-snug">
          Q: {question}
        </h4>
        <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-slate-100">
          {answer}
        </p>
      </div>

      {aiFeedback && (
        <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">AI Reflection</span>
          </div>
          {aiFeedback.empathy && (
            <p className="text-sm text-indigo-900 leading-relaxed font-medium">
              {aiFeedback.empathy}
            </p>
          )}

          {aiFeedback.deepDive && (
            <div className="pt-3 border-t border-indigo-200/50 space-y-3">
              <p className="text-xs text-indigo-700 italic font-semibold">
                💡 {aiFeedback.deepDive}
              </p>
              {/* ✍️ オートリサイズ入力欄 */}
              <div className="relative mt-2">
                <textarea
                  ref={textareaRef}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="この問いについて、もう少し深く考えてみる..."
                  className="w-full min-h-[40px] p-2 bg-white/50 border-b border-indigo-200 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors resize-none overflow-hidden"
                  rows={1}
                />
                {reply && (
                  <button className="absolute right-0 bottom-2 text-[10px] font-bold text-indigo-500 hover:text-indigo-700 transition-all uppercase tracking-tighter">
                    Keep Writing →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}