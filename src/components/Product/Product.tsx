import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";

interface ProductProps {
    title: string;
    image: string;
    brand: string;
    category: string;
    price: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    ID: string | number;
}

export default function Product({
    title,
    image,
    brand,
    category,
    price,
    ratingsAverage,
    ratingsQuantity,
    ID
}: ProductProps) {
    return (
        <div className="flex flex-col rounded-xl border bg-white shadow-sm hover:shadow-lg transition p-4">
            <Link href={`/Products/${ID}`} className="">
                {/* Product Image */}
                <div className="relative w-full h-56 flex items-center justify-center">
                    <Image
                        width={200}
                        height={200}
                        src={image}
                        alt={title}
                        className="object-contain p-4"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow mt-4">
                    <span className="text-sm text-gray-500">{brand}</span>
                    <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
                    <span className="text-sm text-gray-500">{category}</span>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={
                                    i < Math.round(ratingsAverage)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">
                            ({ratingsQuantity})
                        </span>
                    </div>

                    {/* Price */}
                    <span className="mt-2 text-lg font-bold">{price} EGP</span>
                </div>
            </Link>


            {/* Actions */}
            <div className="flex items-center gap-2 mt-4">
                <AddToCart productId={String(ID)} />
                <button className="rounded-md border p-2 hover:bg-gray-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
