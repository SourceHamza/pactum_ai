import { NextRequest } from "next/server";

export async function name(req : NextRequest ) {
    const {} = await req.json();
}