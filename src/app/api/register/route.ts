import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
