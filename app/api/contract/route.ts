import { NextRequest, NextResponse } from "next/server";

async function extractTextFromFile(file: any) {
  const text = await file.text();
  return text;
}

async function extractTextFromPDF(pdf: any) {
  // const text = await file.text()
}

export async function POST(req: NextRequest) {
  // get the Uploaded file and store in the database
  const formData = await req.formData();
  const file = formData.get("file") as File;
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
  //  Send the text to the GPT
  // Get back a response and store the Response in Analyses Model / send it
  return NextResponse.json(
    {
      message: "success",
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  const {} = await req.json();
}

export async function DELETE(req: NextRequest) {
  const {} = await req.json();
}
