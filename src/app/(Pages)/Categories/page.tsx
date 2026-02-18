"use client";

import React, { useEffect, useState } from "react";
import Product from "@/components/Product/Product"; // adjust the import path if needed
import { CategoryI, ProductI } from "@/Interfaces/Interfaces";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: Category;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ApiResponse | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
      const data = await res.json();
      setCategories(data.data);
    }
    fetchCategories();
  }, []);

  // Fetch category details + products
  async function fetchCategoryData(id: string) {
    setLoading(true);
    setSelectedCategory(null);
    setProducts([]);

    // category details
    const categoryRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    const categoryData = await categoryRes.json();
    setSelectedCategory(categoryData);

    // category products
    const productRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
    const productData = await productRes.json();
    setProducts(productData.data);

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4 
                h-screen sticky top-0 
                overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="cursor-pointer p-2 rounded hover:bg-gray-200 flex items-center gap-2"
              onClick={() => fetchCategoryData(category._id)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-8 h-8 object-contain"
              />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Category Details */}
        {selectedCategory && (
          <div className="border rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory.data.name}
            </h2>
            <img
              src={selectedCategory.data.image}
              alt={selectedCategory.data.name}
              className="w-40 h-40 object-contain mb-4"
            />
            <p className="text-gray-500">Slug: {selectedCategory.data.slug}</p>
          </div>
        )}

        {/* Products */}
        {products.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Products ({products.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Product
                  key={p._id}
                  title={p.title}
                  image={p.imageCover}
                  brand={p.brand.name}
                  category={p.category.name}
                  price={p.price}
                  ratingsAverage={p.ratingsAverage}
                  ratingsQuantity={p.ratingsQuantity}
                  ID={p._id}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !selectedCategory && (
          <p className="text-gray-500">
            Select a category from the sidebar to view details and products.
          </p>
        )}
      </main>
    </div>
  );
}
