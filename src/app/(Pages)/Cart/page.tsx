"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import { CartContext } from "@/components/Context/CartContext";
import Checkout from "@/components/Checkout/Checkout";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [updatedItem, setupdatedItem] = useState('');
  const [removeload, setremoveload] = useState(false);
  const [removeId, setremoveId] = useState('');
  const [clear, setclear] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { getcart, cartData } = useContext(CartContext);

  // Fetch cart data when component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      setPageLoading(true);
      await getcart();
      setPageLoading(false);
    };
    
    fetchCartData();
  }, []);

  async function clearCart() {
    setclear(true);
    await fetch("/api/clear-cart", { method: "DELETE" });
    await getcart();
    setclear(false);
  }

  async function handleRemoveItem(itemId: string) {
    setremoveload(true);
    setremoveId(itemId);
    await fetch(`/api/remove-item?id=${itemId}`, { method: "DELETE" });
    await getcart();
    setremoveload(false);
    setremoveId('');
  }

  async function handleUpdateCount(itemId: string, newCount: number) {
    setLoading(true);
    setupdatedItem(itemId);
    await fetch("/api/update-count", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, count: newCount }),
    });
    await getcart();
    setLoading(false);
    setupdatedItem('');
  }

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-8" />
        <span className="ml-2">Loading cart...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 relative">
      {/* Your existing JSX remains the same */}
      {/* Left Section - Items */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>

        <div>
          <p className="text-gray-500 mb-4">
            {cartData?.data.products?.length || 0} items in your cart
          </p>

          <div className="space-y-4">
            {!cartData || cartData?.data.products?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m0 0h14m-14 0h14"
                  />
                </svg>
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm mt-1">Start shopping to fill it up!</p>
              </div>
            ) : (
              cartData?.data.products?.map((item: any) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={100}
                      className="rounded-md"
                    />
                    <div>
                      <h2 className="font-semibold">{item.product.title}</h2>
                      <p className="text-sm text-gray-500">
                        {item.product.brand?.name} • {item.product.category?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-5">
                        <button disabled={item.count == 1} onClick={() => handleUpdateCount(item.product._id, item.count - 1)} className="border rounded px-2 cursor-pointer hover:bg-black transition hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="font-bold">{loading && (updatedItem == item.product._id) ? <Loader className="animate-spin" /> : item.count}</span>
                        <button onClick={() => handleUpdateCount(item.product._id, item.count + 1)} className="border rounded px-2 cursor-pointer hover:bg-black transition hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Price + Remove */}
                  <div className="text-right">
                    <p className="font-semibold">
                      EGP {(item.price * item.count)}
                    </p>
                    <button
                      className="text-red-500 text-sm mt-2 cursor-pointer rounded-2xl px-1.5 hover:bg-red-700 hover:text-white transition"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      {removeload && removeId === item.product._id ? <Loader className="animate-spin" /> : 'Remove'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full md:w-100 border rounded-xl p-6 mt-20 shadow-md h-fit sticky top-20">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <button onClick={clearCart} disabled={!cartData || cartData?.data.products?.length === 0} className="text-red-500 text-sm mt-2 cursor-pointer rounded-2xl px-1.5 hover:bg-red-700 hover:text-white transition">
            { clear ? <Loader className=" animate-spin text-red-500 size-7"/>
            :
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 text-red-500 cursor-pointer hover:bg-red-700 hover:text-white transition rounded-xl p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            }
          </button>
        </div>

        <div className="flex justify-between mb-2 text-sm">
          <span>Subtotal ({cartData?.data.products?.length || 0} items)</span>
          <span>EGP {cartData?.data.totalCartPrice?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>EGP {cartData?.data.totalCartPrice?.toLocaleString() || 0}</span>
        </div>

        <Checkout cartId={cartData?.data._id ?? ""} />

        <Link href="/Products">
          <p className="border w-full py-2 rounded-lg block text-center hover:bg-gray-100 transition">
            Continue Shopping
          </p>
        </Link>
      </div>
    </div>
  );
}