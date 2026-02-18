"use client";

import React from "react";
import Image from "next/image";

interface CartItemProps {
  item: any;
  onRemove?: (id: string) => void;
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
}

export default function CartItem({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between border rounded-xl p-4 shadow-sm">
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
            {item.product.brand.name} • {item.product.category.name}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-5">
            {/* Decrease Button */}
            <button
              onClick={() => onDecrease?.(item._id)}
              className="border rounded px-2 cursor-pointer hover:bg-black transition hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>

            <span className="font-bold">{item.count}</span>

            {/* Increase Button */}
            <button
              onClick={() => onIncrease?.(item._id)}
              className="border rounded px-2 cursor-pointer hover:bg-black transition hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="text-right">
        <p className="font-semibold">
          EGP {(item.price * item.count).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove?.(item._id)}
          className="text-red-500 text-sm mt-2 cursor-pointer rounded-2xl px-1.5 hover:bg-red-700 hover:text-white transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
