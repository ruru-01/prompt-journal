import React from 'react';

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
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* ヘッダー部分：日付 */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">{date}</span>
        {aiFeedback && (
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" title="AI Feedback included"></span>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* ユーザーの記録セクション */}
        <section>
          <h4 className="text-sm font-semibold text-indigo-500 mb-1 italic">Q: {question}</h4>
          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{answer}</p>
        </section>

        {/* AIのフィードバックセクション（データがある場合のみ表示） */}
        {aiFeedback && (
          <section className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 relative overflow-hidden">
            {/* 装飾的な背景アイコン代わり */}
            <div className="absolute -right-2 -top-2 opacity-10">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-600">
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-5-4 5h3v4h2v-4z" />
              </svg>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">AI Response</span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {aiFeedback.empathy}
                </p>
              </div>

              <div className="pt-2 border-t border-indigo-200/50">
                <p className="text-sm text-indigo-700 font-bold italic">
                  ✨ {aiFeedback.deepDive}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}