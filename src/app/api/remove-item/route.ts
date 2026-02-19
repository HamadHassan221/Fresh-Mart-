import { getUserToken } from "@/getUserToken/getUserToken";
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function DELETE(req: Request) {
  try {
    const token = await getUserToken();
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: "DELETE",
      headers: { token: token + "" },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
