"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug?: string;
}

export default function BrandSidebar() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
        const json = await res.json();
        if (mounted && json?.data) setBrands(json.data);
      } catch (err) {
        console.error("Failed to load brands", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <aside className="w-64 bg-gray-100 border-r p-4 h-screen sticky top-0 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Brands</h2>
      {loading && <p className="text-sm text-gray-500">Loading brands…</p>}
      <ul className="space-y-2">
        {brands.map((b) => (
          <li key={b._id}>
            <Link
              href={`/brand/${b._id}`}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-200"
            >
              <img src={b.image} alt={b.name} className="w-8 h-8 object-contain" />
              <span className="text-sm">{b.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
