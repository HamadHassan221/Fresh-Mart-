import React from 'react'
import { ProductI } from '@/Interfaces/Interfaces'
import Product from '@/components/Product/Product';


export default async function Products() {

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data : products } : {data : ProductI[]} = await res.json()
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((p) => (
        <Product
          key={p.id}
          ID ={p.id}
          title={p.title}
          image={p.imageCover}
          brand={p.brand.name}
          category={p.category.name}
          price={p.price}
          ratingsAverage={p.ratingsAverage}
          ratingsQuantity={p.ratingsQuantity}
        />
      ))}
    </div>
  )
}
