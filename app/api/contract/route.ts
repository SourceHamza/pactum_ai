import { NextRequest, NextResponse } from "next/server";


async function  extractTextFromFile(file : any) { 
    const text = await file.text()
    return text 
} 

async function  extractTextFromPDF(pdf : any) { 
    // const text = await file.text()
}

export async function POST(req: NextRequest) {
    // get the Uploaded file and store in the database 

    const formData = new FormData()

    const file = formData.get("file") as File
    formData.append("file", file)

    if (!file) throw new Error("No file Uploaded")

    const allowedTypes = ["application/pdf", "text/plain"]

    //  Analyze the type of file 
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
        throw new Error("File too large")
    }

    const text = await extractTextFromFile(file)

    return NextResponse.json( { 
        message : text 
    })
    

    //  Send the file to the GPT

    // Get back a response and store the Response in Analyses Model / send it 

export async function GET(req : NextRequest ) {
    const {} = await req.json();
}

export async function POST(req : NextRequest ) {
    const {} = await req.json();
}

export async function DELETE(req : NextRequest ) {
    const {} = await req.json();
}