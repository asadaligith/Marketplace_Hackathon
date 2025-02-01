import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { RxDividerVertical } from "react-icons/rx";
import { BsViewList } from "react-icons/bs";
import Image from "next/image";

export default function Shop() {
  const products = [
    { id: 1, name: "Trenton modular sofa_3", price: "Rs. 25,000.00", image: "/image1.jpg" },
    { id: 2, name: "Granite dining table with dining chair", price: "Rs. 30,000.00", image: "/image2.jpg" },
    { id: 3, name: "Outdoor bar table and stool", price: "Rs. 20,000.00", image: "/image3.jpg" },
    { id: 4, name: "Plain console with teak mirror", price: "Rs. 15,000.00", image: "/image4.jpg" },
    { id: 5, name: "Grain coffee table", price: "Rs. 40,000.00", image: "/image5.jpg" },
    { id: 6, name: "Kent coffee table", price: "Rs. 18,000.00", image: "/image6.jpg" },
    { id: 7, name: "Round coffee table_color 2", price: "Rs. 22,000.00", image: "/image7.jpg" },
    { id: 8, name: "Reclaimed teak coffee table", price: "Rs. 19,000.00", image: "/image8.jpg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-60 sm:h-72 md:h-80"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-Poppins text-center">Shop</h1>
            <p className="text-base sm:text-xl md:text-2xl mt-2">Home &gt; Shop</p>
          </div>
        </div>
      </header>

      {/* Filter & Sorting Section */}
      <section className="flex flex-wrap justify-between items-center w-full h-auto bg-[#FAF4F4] mt-[20px] px-4 py-4 md:px-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <SlidersHorizontal size={24} />
          <h6 className="text-[16px] sm:text-[18px]">Filter</h6>
          <HiOutlineViewGrid size={24} />
          <BsViewList size={24} />
          <RxDividerVertical size={24} />
          <h2 className="text-[14px] sm:text-[16px] font-semibold">
            Showing 1–8 of 32 results
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <h3 className="text-[14px] sm:text-[16px]">Show</h3>
          <button className="bg-white text-[#9F9F9F] px-4 py-2 rounded-md">8</button>
          <h3 className="text-[14px] sm:text-[16px]">Sort by</h3>
          <button className="bg-white text-[#9F9F9F] px-6 py-2 rounded-md">Default</button>
        </div>
      </section>

      {/* Products Section */}
      <main className="px-4 py-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="text-left">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-4">
                  {product.name}
                </h4>
                <p className="text-base sm:text-lg md:text-xl font-bold text-black">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}