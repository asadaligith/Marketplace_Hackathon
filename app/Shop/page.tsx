"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination"; 

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
}

const itemsPerPage = 8; // Number of products per page

export default function Shop() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from Sanity CMS
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: IProduct[] = await client.fetch(
          `*[_type == "product"] {
            _id,
            name,
            price,
            description,
            discountPercentage,
            isFeaturedProduct,
            stockLevel,
            category,
            image
          }`
        );
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Slice the products array for pagination
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-60 sm:h-72 md:h-80"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-Poppins text-center">Shop</h1>
        </div>
      </header>

      {/* Search & Filter Section */}
      <SearchFilter products={products} setFilteredProducts={setFilteredProducts} />

      {/* Products Section */}
      <main className="px-4 py-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">All Products</h2>
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div key={product._id} className="text-left">
                  <Link href={`/Shop/${product._id}`}>
                    <div className="relative w-full h-64">
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-4">
                      {product.name}
                    </h4>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-black">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Section - Rendered only at the bottom */}
          {!loading && !error && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
