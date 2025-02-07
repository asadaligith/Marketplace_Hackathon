import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

export default function MenuBar() {
  return (
    <div className="md:hidden">
      {/* Sheet for Mobile Menu */}
      <Sheet>
        <SheetTrigger>
          <Menu className="text-2xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="p-4">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            <SheetDescription>
              <ul className="space-y-6 text-lg font-medium">
                <li>
                  <Link href="/" className="hover:text-gray-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/Shop" className="hover:text-gray-600">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/About" className="hover:text-gray-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/Contact" className="hover:text-gray-600">
                    Contact
                  </Link>
                
                </li>
                <li>
        <Link href="/cart"><IoCartOutline size={24} /></Link>
               </li>
               <li> 
                 <Link href="#"><IoIosSearch size={24} /></Link> 
                 </li>
              <li>
              <Link href="#"><CiHeart size={24} /></Link>
              </li>

              <li>
              <Link href="#"><FaRegUser size={24} /></Link>
              </li>

              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}