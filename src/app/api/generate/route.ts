import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {

  try {
  const { content, prompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemInstruction = `
  あなたは親身なジャーナリングパートナーです。
  ユーザーの回答に対して、以下の2点を必ずJSON形式で返してください。
  {
    "empathy": "共感の言葉（200文字以内）",
    "deepDive": "深掘りの問いかけ（1つ）"
  }
  返信は日本語のみで行ってください。
  `;

  // AIに実行命令を出す
  const result = await model.generateContent(`${systemInstruction}\n\n問い: ${prompt}\nユーザーの回答: ${content}`);
  const response = await result.response;
  const text = response.text();

  console.log("AIの生の回答:", text);

  // 4. AIの回答を掃除してJSONに変換する
  const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

  // JSONの開始と終了を探して抽出（より頑丈にするため）
  const jsonStart = cleanedText.indexOf('{');
  const jsonEnd = cleanedText.lastIndexOf('}') + 1;
  const jsonString = cleanedText.slice(jsonStart, jsonEnd);

  const feedback = JSON.parse(jsonString);

  // データをフロントに返す
  return NextResponse.json(feedback);

  } catch(error) {
    console.error("エラー詳細:", error);
    return NextResponse.json({ error: "AI生成に失敗しました" }, { status: 500 });
  }
}