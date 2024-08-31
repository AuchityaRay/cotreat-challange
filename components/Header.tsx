import { LOGIN } from "@/routes/routes";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-custom-drop">
      {/* Logo */}
      <div className="text-center flex-shrink-0">
        <Link href="/" className="font-semibold text-[24px] sm:text-[30px] font-robotoSerif">
          PicShare
        </Link>
      </div>

      {/* Logged-in User Actions */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button className="bg-daybreak-blue hover:bg-blue-600  py-1 px-3 h-10 
        text-white font-normal text-sm sm:text-base rounded-sm ">
          Share Pic
        </button>
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
        <Link href={LOGIN} className="bg-daybreak-blue hover:bg-blue-600 transition-colors py-2 px-4 
        text-white font-normal text-sm sm:text-base rounded-sm ">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Header;
