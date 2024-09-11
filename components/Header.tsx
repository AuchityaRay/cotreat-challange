"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import SharePicPopup from "./SharePicPopup";
import BlueButton from "./BlueButton";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [isSharePicPopup, setIsSharePicPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem("userId"); 
    if (userId) {
      setIsLoggedIn(true);
      fetchUserDetails(userId); 
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setUsername(null);
    router.push("/login"); // Redirect to login page after logout
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
           {/* Links Visible to All Users */}
          {isLoggedIn && (
         <>
          <Link
            href="/"
            className={`
              ${
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
            className={`
              ${
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
        {isLoggedIn ? (
          <div className="flex items-center space-x-4 sm:space-x-6">
            <BlueButton value="Share Pic" onClick={handleImageClick} />
            {username && (
              <h2 className="font-medium text-gray-500 text-sm sm:text-base">
                Hi {username}
              </h2>
            )}
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
