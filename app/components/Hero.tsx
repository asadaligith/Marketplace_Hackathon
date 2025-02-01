import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Hero() {
  const product = [
    { id: 1, name: "Trenton modular sofa_3", price: "Rs. 25,000.00", image: "/image1.jpg" },
    { id: 2, name: "Granite dining table with dining chair", price: "Rs. 30,000.00", image: "/image2.jpg" },
    { id: 3, name: "Outdoor bar table and stool", price: "Rs. 20,000.00", image: "/image3.jpg" },
    { id: 4, name: "Plain console with teak mirror", price: "Rs. 15,000.00", image: "/image4.jpg" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#FBEBB5] min-h-screen flex items-center px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight">
              Rocket single <br /> seater
            </h1>
            <Link href="/Shop" className="text-lg sm:text-xl font-medium underline hover:no-underline hover:text-gray-600 transition">
              Shop Now
            </Link>
          </div>
          {/* Right Content (Image) */}
          <div className="flex justify-center items-center">
            <Image
              src="/Single seater picture.png"
              alt="Chair Picture"
              height={600}
              width={600}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="flex flex-wrap justify-center gap-10 px-6 sm:px-10 lg:px-16 py-10 bg-[#FAF4F4]">
        <div className="flex flex-col items-center">
          <Image
            src="/Granite square side table 1.png"
            alt="Side Table"
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
          <h3 className="text-xl font-medium mt-4">Side Table</h3>
          <Link href="/Shop" className="underline text-gray-600 hover:text-black">
            View More
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/Cloud sofa three seater + ottoman_3 1.png"
            alt="Cloud Sofa"
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
          <h3 className="text-xl font-medium mt-4">Side Table</h3>
          <Link href="/Shop" className="underline text-gray-600 hover:text-black">
            View More
          </Link>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 bg-white">
        <h1 className="text-2xl sm:text-3xl font-medium text-center">Top Picks For You</h1>
        <p className="text-sm sm:text-base text-center text-gray-500 mt-4">
          Find a bright ideal to suit your taste with our great selection of suspension, floor, and table lights.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {product.map((product) => (
            <div key={product.id} className="text-center">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <h4 className="text-lg font-semibold mt-4">{product.name}</h4>
              <p className="text-base font-bold text-gray-800">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/Shop" className="underline text-gray-600 hover:text-black">
            View More
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="flex flex-wrap items-center gap-6 px-6 sm:px-10 lg:px-16 py-12 bg-[#FFF9E5]">
        <div className="flex-1 flex justify-center">
          <Image
            src="/Asgaard-Sofa.png"
            alt="Asgaard Sofa"
            width={500}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center">
          <h6 className="text-lg sm:text-xl font-medium">New Arrivals</h6>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">Asgaard Sofa</h1>
          <Button variant="outline" className="bg-[#FFF9E5] mt-6">
            Order Now
          </Button>
        </div>
      </section>
    </>
  );
}

export default Hero;