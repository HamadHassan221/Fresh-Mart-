'use server'

import { getUserToken } from "@/getUserToken/getUserToken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCartAction (productId: string) {
    const token = await getUserToken();

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
            token: token + '',
            'content-type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}