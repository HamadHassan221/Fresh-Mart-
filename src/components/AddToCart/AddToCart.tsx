'use client'
import { Loader } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import { addToCartAction } from '@/app/(Pages)/Products/_action/addToCart.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AddToCart({ productId }: { productId?: string }) {

    const [cartLoading, setCartLoading] = useState(false);
  const { setcartData } = useContext(CartContext);
  const session = useSession();
  const router = useRouter();

  async function addToCart() {
    if (session.status === "authenticated") {
      if (!productId) {
        toast.error("Product ID is missing");
        return;
      }

      setCartLoading(true);
      const data = await addToCartAction(productId); // always string now
      setcartData(data);
      setCartLoading(false);
      console.log(data);
      

      if (data.status === "success") {
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add product to cart");
      }
    } else {
      router.push("/Login");
    }
  }


    return (
        <button disabled={cartLoading} className="flex-1 flex items-center justify-center gap-2 rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition"
            onClick={addToCart}>
            Add To Cart
            {cartLoading ? <Loader className='animate-spin' /> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            }
        </button>
    )
}
