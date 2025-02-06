"use client";
import React, { useState, useEffect } from "react";

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

interface SearchFilterProps {
  products: IProduct[];
  setFilteredProducts: (products: IProduct[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let filtered = products;

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products, setFilteredProducts]);

  return (
    <section className="flex flex-wrap justify-between items-center w-full bg-[#FAF4F4] px-4 py-4 md:px-8">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
};

export default SearchFilter;
