import { NextRequest, NextResponse } from "next/server";
import { getServerUserToken } from "@/getUserToken/getServerUserToken";

const API_BASE = process.env.API_BASE;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cartId } = await params;
  const token = await getServerUserToken();
  const body = await req.json();

  try {
    const res = await fetch(
      `${API_BASE}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const raw = await res.text();
      return NextResponse.json(
        { error: "External API error", raw },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}