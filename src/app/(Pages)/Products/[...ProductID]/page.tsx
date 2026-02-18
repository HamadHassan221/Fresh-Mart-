import Image from "next/image";
import { Star } from "lucide-react";
import { ProductI } from "@/Interfaces/Interfaces";
import Slider from "@/components/Slider/Slider";
import AddToCart from "@/components/AddToCart/AddToCart";


export default async function ProductDetails({
  params: { ProductID },
}: {
  params: { ProductID: string };
}) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${ProductID}`,
    { cache: "no-store" }
  );
  const { data: product }: { data: ProductI } = await res.json();

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="flex flex-col items-center">
          <Slider images={product.images} />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          {/* Title & Brand */}
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <span className="text-sm text-gray-500">
            {product.brand?.name} • {product.category?.name}
          </span>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(product.ratingsAverage)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-black">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>
            {product.priceAfterDiscount && (
              <span className="line-through text-gray-500">
                {product.price} EGP
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <AddToCart productId={ProductID} />
            <button className="rounded-xl border p-3 hover:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
