import { getUserToken } from "@/getUserToken/getUserToken";
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function PUT(req: Request) {
  try {
    const token = await getUserToken();
    const body = await req.json();
    const { itemId, count } = body;

    if (!itemId || typeof count !== "number") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: "PUT",
      headers: {
        token: token + "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
  }
}
