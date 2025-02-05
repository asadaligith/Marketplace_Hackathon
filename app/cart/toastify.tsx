"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css";

import { Button } from '@/components/ui/button';
import { add } from '../Redux/features/cartSlice';


function Toastify({cartItem}:any) {
    
const dispatch = useDispatch()

const handleadd = (cartItem:any)=>{
    dispatch(add(cartItem))
}


    const notify = () => 
    toast.success('Product added Successfully!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  return (
    <>
    <div  onClick={()=>handleadd(cartItem)}>
         <Button  onClick={notify} className="bg-black text-white lg:w-[300px]"
           >Add to Cart</Button>
    </div>
     <ToastContainer
     position="bottom-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick={false}
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
     transition={Bounce}
     />
     </>

  )
}

export default Toastify