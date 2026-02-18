import { getUserToken } from "@/getUserToken/getUserToken";
import { CartResponseI } from "@/Interfaces/Interfaces";
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function GET() {
    const token = await getUserToken();

    const response = await fetch(`${API_BASE}/cart`, {
        method: 'GET',
        headers: {
            token: token + '',
        }
    });
    const data: CartResponseI = await response.json();
    console.log(token+ 'token');
    console.log('token');
    

    return NextResponse.json(data);
}