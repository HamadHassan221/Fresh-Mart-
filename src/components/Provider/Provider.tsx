'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import CartProvider from '../Context/CartContext'
import Navbar from '../Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from '../Footer/Footer'

export default function Provider({children} : {children: ReactNode}) {
    return (
        <SessionProvider>
            <CartProvider>
                <Navbar />
                <Toaster position="bottom-center"
                    reverseOrder={true} />
                <div className="min-h-[calc(100vh-150px)]">
                    {children}
                </div>
                <Footer />
            </CartProvider>
        </SessionProvider>
    )
}
