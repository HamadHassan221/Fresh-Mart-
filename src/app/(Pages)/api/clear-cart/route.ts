import { getUserToken } from "@/getUserToken/getUserToken";
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function DELETE() {
  try {
    const token = await getUserToken();

    const res = await fetch(`${API_BASE}/cart`, {
      method: "DELETE",
      headers: { token: token + "" },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
