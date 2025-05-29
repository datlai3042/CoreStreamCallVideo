import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const pathFile = searchParams.get("pathFile");

  
    if (!pathFile ) {
        return NextResponse.json({ error: "Missing component name" }, { status: 400 });
    }

    try {
        const filePath = path.join(process.cwd(), `src/app/core/${pathFile}`);
        console.log({filePath})
        const code = await fs.readFile(filePath, "utf-8");
        return NextResponse.json({ code });
    } catch (error: unknown) {
        console.log({error})
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
