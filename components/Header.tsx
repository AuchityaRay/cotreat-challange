"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SharePicPopup from "./SharePicPopup";
import BlueButton from "./BlueButton";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isSharePicPopup, setIsSharePicPopup] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading, login  } = useAuth(); 
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!user && !isLoading) {
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("useraccess");

       
        if (userId && accessToken) {
          login(userId, accessToken);
        }
      }

     
      if (user) {
        clearInterval(intervalId);
      }
    }, 1000); 

   
    return () => clearInterval(intervalId);
  }, [user, isLoading, login]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
        <div className="text-center flex-shrink-0 space-x-6">
          <Link
            href="/"
            className="font-semibold text-[24px] sm:text-[30px] font-robotoSerif"
          >
            PicShare
          </Link>

          {/* Links Visible to Logged-in Users Only */}
          {user && (
            <>
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-daybreak-blue border-daybreak-blue border-b-2"
                    : "text-gray-800"
                } font-medium hover:text-daybreak-blue 
              text-sm sm:text-base hover:border-b-2 pb-6 hover:border-daybreak-blue`}
              >
                Home
              </Link>

              <Link
                href="/favorite"
                className={`${
                  pathname === "/favorite"
                    ? "text-daybreak-blue border-daybreak-blue border-b-2"
                    : "text-gray-800"
                } font-medium hover:text-daybreak-blue 
              text-sm sm:text-base hover:border-b-2 pb-6 hover:border-daybreak-blue`}
              >
                Favourite
              </Link>
            </>
          )}
        </div>

        {/* Logged-in User Actions */}
        {user ? (
          <div className="flex items-center space-x-4 sm:space-x-6">
            <BlueButton value="Share Pic" onClick={handleImageClick} />

            <h2 className="font-medium text-gray-500 text-sm sm:text-base">
              Hi {user.username} {/* Show user name */}
            </h2>

            <button
              onClick={handleLogout}
              className="text-daybreak-blue hover:bg-daybreak-blue hover:text-white py-1 px-3 h-10 font-normal text-sm sm:text-base hover:rounded-sm"
            >
              Log out
            </button>
          </div>
        ) : (
          // Not Logged-in User Actions
          <div className="mt-4 sm:mt-0 text-center flex-shrink-0">
            <BlueButton href="/login" value="Login" />
          </div>
        )}
      </div>

      {/* Share Pic Popup */}
      {isSharePicPopup && (
        <SharePicPopup isOpen={isSharePicPopup} onClose={closeModal} />
      )}
    </>
  );
};

export default Header;
