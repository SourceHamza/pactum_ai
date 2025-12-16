import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "nodejs"

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

async function analyze(contract: string) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const USER_PROMPT_WITH_CONTRACT = `Analyze the following contract:

"""
${contract}
"""`

    const response = await client.responses.create({
        model: "gpt-5-nano",
        input: [
            { role: "system", content: CorePrompt },
            { role: "user", content: USER_PROMPT_WITH_CONTRACT }
        ],
    })

    return response.output_text
}

async function extractTextFromFile(file: File) {
    return await file.text()
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("File") as File | null

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            )
        }

        const allowedTypes = ["application/pdf", "text/plain"]

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type" },
                { status: 400 }
            )
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large" },
                { status: 400 }
            )
        }

        const text = await extractTextFromFile(file)

        if (!text.trim()) {
            return NextResponse.json(
                { error: "Empty file content" },
                { status: 400 }
            )
        }

        const analysis = await analyze(text)

        return NextResponse.json({
            analysis
        })

    } catch (error) {
        console.error("Analyze API error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

//  Send the file to the GPT

// Get back a response and store the Response in Analyses Model / send it 







export async function GET(req: NextRequest) {
    const { } = await req.json();
}


export async function DELETE(req: NextRequest) {
    const { } = await req.json();
}