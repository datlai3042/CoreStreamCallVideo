// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get("path");


    console.log({ path })
    if (!path) {
        return NextResponse.json({ message: "Missing path" }, { status: 400 });
    }

    revalidatePath(path);
    return Response.json({ revalidated: true });
}
