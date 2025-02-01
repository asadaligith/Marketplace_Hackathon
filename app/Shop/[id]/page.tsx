import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react';

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
  image: string;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  console.log("Received ID:", params.id); // ✅ Debugging

  // Fetch the product directly by ID
  const query = `
    *[_type == "product" && id == $id][0] {
      id,
      name,
      price,
      description,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category,
      image
    }
  `;

  const result: IProduct | null = await client.fetch(query, { id: params.id });

  // If no product is found, show a message
  if (!result) {
    return (
      <div className="text-center text-red-500">
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 p-6 mb-6">
      {/* Check if image exists before using urlFor */}
      {result.image && (
        <Image src={urlFor(result.image).url()} alt={result.name} width={400} height={400} />
      )}

      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>{result.category}</h1>
        <h1 className='text-xl font-bold'> Name: {result.name}</h1>
        <h1 className='text-xl font-bold'> Price: $ {result.price}</h1>
        <h1 className='text-xl font-bold'> Discount: {result.discountPercentage}%</h1>
        <h1 className='text-xl font-bold'> Stock: {result.stockLevel}</h1>
        <h1 className='text-xl font-bold'> Featured: {result.isFeaturedProduct ? "Yes" : "No"}</h1>
        <p className='text-lg font-semi-bold'>{result.description}</p>
      </div>
    </div>
  );
}
