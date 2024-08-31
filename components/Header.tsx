"use client"
import { LOGIN } from "@/routes/routes";
import Link from "next/link";
import React, { useState } from "react";
import SharePicPopup from "./SharePicPopup";
import BlueButton from "./BlueButton";

type Props = {};

const Header = (props: Props) => {
  const [IsSharePicPopup, setIsSharePicPopup] = useState(false);
  const handleImageClick = () => {
    setIsSharePicPopup(true);
  };
  const closeModal = () => {
    setIsSharePicPopup(false);
  };
  return (
    <>

    <div className="flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-custom-drop">
      {/* Logo */}
      <div className="text-center flex-shrink-0">
        <Link href="/" className="font-semibold text-[24px] sm:text-[30px] font-robotoSerif">
          PicShare
        </Link>
      </div>

      {/* Logged-in User Actions */}
      <div className="flex items-center space-x-4 sm:space-x-6">
   
        <BlueButton value="Share Pic" onClick={() => handleImageClick()}/>
     
        <h2 className="font-medium text-gray-500 text-sm sm:text-base ">
          Hi Neekey
        </h2>
        <button className="text-daybreak-blue hover:bg-daybreak-blue hover:text-white 
        py-1 px-3 h-10 font-normal text-sm sm:text-base hover:rounded-sm ">
          Log out
        </button>
      </div>

      {/* Log in Button for Logged-out User */}
      <div className="mt-4 sm:mt-0 text-center flex-shrink-0">

       <Link href={LOGIN} >
       <BlueButton value="Login" />
     
        </Link>
      </div>
    </div>
    <SharePicPopup    isOpen={IsSharePicPopup}
        onClose={closeModal}/>
    </>
  );
};

export default Header;
