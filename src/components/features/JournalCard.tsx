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

      {/* AI フィードバックセクション */}
      {aiFeedback && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">AI Reflection</span>
          </div>
          {/* empathy があるときだけ表示 */}
          {aiFeedback.empathy && (
            <p className="text-sm text-indigo-900 leading-relaxed">
              {aiFeedback.empathy}
            </p>
          )}

          {/* deepDive があるときだけ表示 */}
          {aiFeedback.deepDive && (
            <div className="pt-2 border-t border-indigo-200/50">
              <p className="text-xs text-indigo-700 italic">
                💡 {aiFeedback.deepDive}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}