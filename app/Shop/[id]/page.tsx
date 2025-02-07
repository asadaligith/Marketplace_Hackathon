"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { add } from "@/app/Redux/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  stockLevel: number;
  category: string;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product) return;

    const discountedPrice = product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

    const cartProduct = {
      id: product._id,
      name: product.name,
      price: discountedPrice,
      image: urlFor(product.image).url(),
      qty: 1,
    };

    dispatch(add(cartProduct));

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `
          *[_type == "product" && _id == "${id}"][0] {
            _id,
            name,
            price,
            description,
            discountPercentage,
            stockLevel,
            category,
            image
          }
        `;

        const productData: IProduct = await client.fetch(query);
        if (!productData) {
          setError("Product not found.");
          return;
        }
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 p-6">
      {product.image && (
        <Image src={urlFor(product.image).url()} alt={product.name} width={400} height={400} />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">{product.category}</h1>
        <h1 className="text-xl font-bold">Name: {product.name}</h1>
        <h1 className="text-xl font-bold">Price: ${product.price}</h1>
        <h1 className="text-xl font-bold">Discount: {product.discountPercentage}%</h1>
        <h1 className="text-xl font-bold">Stock: {product.stockLevel}</h1>
        <p className="text-lg font-semi-bold">{product.description}</p>

        <Button onClick={handleAddToCart} className="bg-blue-600 text-white w-[300px]">
          Add to Cart
        </Button>
      </div>

      <ToastContainer />
    </div>
  );
}
