"use client"

import { useState } from "react";
import Button from "../ui/Button";

type PromptDisplayProps = {
  question: string;
};

export default function PromptDisplay({ question }: PromptDisplayProps) {
  return (
    <div className="py-10 text-center">
      {/* 飾りのアイコンやラベル */}
      <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-500 uppercase bg-indigo-50 rounded-full">
        Today's Question
      </span>
      {/* メインの問いかけ */}
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-800 leading-relaxed max-w-xl mx-auto">
        {question}
      </h2>
      {/* ちょっとした装飾線 */}
      <div className="mt-6 w-12 h-1 bg-indigo-100 mx-auto rounded-full" />
    </div>
  );
}