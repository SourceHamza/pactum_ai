import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"



export const runtime = "nodejs"

const geminiKey = process.env.GEMINI_KEY

const CorePrompt = `You are an AI contract analysis engine.

Your task is to analyze a contract and return a structured risk assessment.

STRICT RULES:
- Output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside JSON.
- Every enum value must match exactly.
- If no issues are found, return an empty array for "issues".
- Be concise, clear, and professional.
- Do NOT provide legal advice. Phrase suggestions as improvements or considerations.

You must return a JSON object that strictly follows this schema:

{
  "riskLevel": "low | medium | high",
  "executiveSummary": "string",
  "issues": [
    {
      "category": "payment | scope | ip | termination | liability | confidentiality | other",
      "severity": "low | medium | high",
      "title": "string",
      "explanation": "string",
      "suggestion": "string",
      "clauseSnippet": "string"
    }
  ],
  "missingClauses": ["string"],
  "recommendedActions": ["string"]
}`

// CHUNKIN LOGIC 
function simpleChunk(text: string, size = 3500) {
    const chunks = [];
    let i = 0;

    while (i < text.length) {
        chunks.push(text.slice(i, i + size));
        i += size;
    }

    return chunks;
}

function buildPrompt(chunk: string) {
return `
Analyze the following PART of a contract.

Rules:
- This is not the full contract
- Identify risks, ambiguities, or unfavorable terms
- Vague, one-sided, or unclear language counts as a risk
- Do NOT assume content outside this text

Focus on:
- Payment terms
- Scope clarity
- Intellectual property ownership
- Termination conditions
- Liability and indemnity
- Confidentiality and data protection

Contract text:
"""
${chunk}
"""
`;
}

async function analyzeFullContract(contract: string) {
    const chunks = simpleChunk(contract);
    const allIssues = [];

    for (const chunk of chunks) {
        const response = await analyze(buildPrompt(chunk));
        let json;
        try {
            json = JSON.parse(response!);
        } catch {
            continue; 
        }

        if (Array.isArray(json.issues)) {
            allIssues.push(...json.issues);
        }

        // small pause to avoid 503
        await new Promise(r => setTimeout(r, 300));
    }

    return {
        riskLevel: allIssues.some(i => i.severity === "high")
            ? "high"
            : allIssues.some(i => i.severity === "medium")
                ? "medium"
                : "low",
        executiveSummary: "Summary based on contract analysis.",
        issues: allIssues,
        missingClauses: [],
        recommendedActions: [],
    };
}

const ai = new GoogleGenAI({ apiKey: geminiKey });
async function analyze(chunks: string) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: chunks }] }],
        config: {
            responseMimeType: "text/plain",
            systemInstruction: CorePrompt,
        },
    });

    return response.text
}







export async function POST(req: NextRequest) {
    // get the Uploaded file and store in the database
    const formData = await req.formData();
    const file = formData.get("File") as File;
    if (!file) {
        return NextResponse.json({ error: "No file received" }, { status: 400 });
    }
    console.log("FILE TYPE : ", file.type);
    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    console.log(file.size);
    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File to Large" }, { status: 400 });
    }
    const text = await file.text();
    const analysis = await analyzeFullContract(text)
    return NextResponse.json(
        {
            analysis,
        },
        { status: 201 }
    );
}





export async function GET(req: NextRequest) {
    const { } = await req.json();
}

export async function DELETE(req: NextRequest) {
    const { } = await req.json();
}