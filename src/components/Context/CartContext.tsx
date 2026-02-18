'use client'
import { CartResponseI } from "@/Interfaces/Interfaces";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponseI | null,
    setcartData: (data: CartResponseI | null) => void,
    cartcontextloader: boolean,
    setcartcontextLoader: (loader: boolean) => void,
    getcart: () => Promise<CartResponseI | null>;
}>({
    cartData: null,
    setcartData: () => {},
    cartcontextloader: false,
    setcartcontextLoader: () => {},
    getcart: async () => null,
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const session = useSession();

    const [cartData, setcartData] = useState<CartResponseI | null>(null)
    const [cartcontextloader, setcartcontextLoader] = useState(false);

    async function getcart() {
        if (session.status == 'authenticated') {
            setcartcontextLoader(true);
            const response = await fetch('http://localhost:3000/api/get-cart')
            const data: CartResponseI = await response.json();
            setcartData(data);
            setcartcontextLoader(false);
            if (data) {
                localStorage.setItem('userId', data?.data.cartOwner!);
            }
            return data;
        }
        return null;
    }

    useEffect(() => {
        getcart();
    }, [session.status]);

    return <CartContext.Provider value={{ cartData, setcartData, cartcontextloader, setcartcontextLoader, getcart }}>
        {children}
    </CartContext.Provider>;
}
