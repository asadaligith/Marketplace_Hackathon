"use client";

import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { remove } from "../Redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartArray = useSelector((state: any) => state.cart);

  const handleRemove = (id: string) => {
    dispatch(remove(id));
  };

  return (
    <div className="w-full flex flex-col justify-center items-start gap-6">
      {cartArray.length === 0 && (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <Link href="/Shop">
            <Button className="rounded-[16px]">Shop Now</Button>
          </Link>
        </div>
      )}

      {cartArray.length > 0 && (
        <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2">
          {cartArray.map((data: any) => (
            <div className="flex justify-between border-b px-3 pb-3" key={data.id}>
              <div className="flex">
                <Image src={data.image} alt={data.name} width={100} height={100} />
                <div className="ml-3">
                  <h1 className="font-bold text-xs md:text-xl">{data.name}</h1>
                  <p className="font-bold">${data.price.toFixed(2)}</p>
                </div>
              </div>

              <button onClick={() => handleRemove(data.uuid)}>
                <MdDelete className="text-xl text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
