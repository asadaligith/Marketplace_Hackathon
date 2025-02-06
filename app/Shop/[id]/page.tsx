"use client";

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { add, addition, subraction } from '@/app/Redux/features/cartSlice';
import { Minus, Plus } from 'lucide-react';

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
  image: string;
  qty:number,
  
}

export default function ProductDetail() {
  const { id } = useParams();                                     //  Get dynamic ID from the URL
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()

  const handleadd = (product:any)=>{
    dispatch(add(product))
  }

  useEffect(() => {
    if (!id) return;                                              //  Prevent fetching if ID is missing

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Received ID:", id);

                                                    //  Fetch all products from Sanity
        const query = `
          *[_type == "product"] {
            _id,
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

        const products: IProduct[] = await client.fetch(query);

        // ✅ Find the product with the matching ID
        const foundProduct = products.find((item) => item._id === id);

        if (!foundProduct) {
          setError("Product not found.");
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        setError("Failed to fetch product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p className="text-center">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 p-6 mb-6">
      {/* Check if image exists before using urlFor */}
      {product.image && (
        <Image src={urlFor(product.image).url()} alt={product.name} width={400} height={400} />
      )}

      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>{product.category}</h1>
        <h1 className='text-xl font-bold'> Name: {product.name}</h1>
        <h1 className='text-xl font-bold'> Price: $ {product.price}</h1>
        <h1 className='text-xl font-bold'> Discount: {product.discountPercentage}%</h1>
        <h1 className='text-xl font-bold'> Stock: {product.stockLevel}</h1>
        <h1 className='text-xl font-bold'> Featured: {product.isFeaturedProduct ? "Yes" : "No"}</h1>
        <p className='text-lg font-semi-bold'>{product.description}</p>

        <div className="md:w-[100px] h-[40px] flex justify-center  lg:justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 absolute bottom-0 right-0 ">
                              <button onClick={()=>dispatch(subraction(product))} ><Minus/></button>
                             {product.qty}
                              <button  onClick={()=>dispatch(addition(product))}><Plus/></button>
                            </div>

        <Button onClick={()=>handleadd(product)} className="bg-blue-600 text-white w-28 active:bg-blue-800">Add to Card</Button>

      </div>




    </div>
  );
}
