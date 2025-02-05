import React from 'react';
import Link from 'next/link';
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import MenuBar from './MenuBar';

function Navbar() {
  return (
    <div className="flex flex-wrap items-center justify-between w-full h-auto px-4 sm:px-6 md:px-8 lg:w-[1440px] lg:h-[100px] text-[#000000]">
      
      {/* Logo Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Asad Ali</h1>
      </div>

      {/* Left Side Links */}
      <div className="hidden md:block">
        <ul className="flex gap-6 sm:gap-10 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/Shop">Shop</Link></li>
          <li><Link href="/About">About</Link></li>
          <li><Link href="/Contact">Contact</Link></li>
        </ul>
      </div>

      {/* Right Side Icons */}
      <div className="hidden md:flex gap-6">
        <Link href="#"><FaRegUser size={24} /></Link>
        <Link href="#"><IoIosSearch size={24} /></Link>
        <Link href="#"><CiHeart size={24} /></Link>
        <Link href="/cart"><IoCartOutline size={24} /></Link>
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden">
        <MenuBar />
      </div>
    </div>
  );
}

export default Navbar;