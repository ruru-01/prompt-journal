import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content, prompt } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const systemInstruction = `
      あなたは親身なジャーナリングパートナーです。
      ユーザーの回答に対して、以下の**2つのキーを持つJSONオブジェクトのみ**を返してください。余計な解説は一切不要です。

      1. "empathy": ユーザーへの共感（200文字以内）
      2. "deepDive": 次の気づきを促す問いかけ（1つ）

      返信例:
      {"empathy": "それは大変でしたね。", "deepDive": "その時どう感じましたか？"}
    `;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemInstruction}\n\n問い: ${prompt}\n回答: ${content}` }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("APIエラー詳細:", data);
      throw new Error(data.error?.message || "APIリクエストに失敗しました");
    }

    const aiText = data.candidates[0].content.parts[0].text;
    console.log("AIの生の回答:", aiText);

    // JSON抽出
    const match = aiText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON形式の回答が得られませんでした");

    const feedback = JSON.parse(match[0]);
    return NextResponse.json(feedback);

  } catch (error: any) {
    console.error("詳細ログ:", error);
    return NextResponse.json(
      { error: "AI生成に失敗しました", message: error.message },
      { status: 500 }
    );
  }
}