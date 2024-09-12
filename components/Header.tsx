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

  const checkLoginStatus = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("useraccess"); // Get token from localStorage

    if (userId && token) {
      setIsLoggedIn(true);
      fetchUserDetails(userId, token); // Pass the token to fetch user details
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  // Check login status on component mount and listen for storage changes
  useEffect(() => {
    checkLoginStatus(); // Run once on component mount

    // Listener for 'storage' event across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userId" || event.key === "useraccess") {
        checkLoginStatus(); // Re-check login status when these keys change
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs once

  const fetchUserDetails = async (userId: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Add Bearer token in the Authorization header
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
    localStorage.removeItem("useraccess"); // Remove access_token from localStorage
    setIsLoggedIn(false);
    setUsername(null);
    router.push("/login"); 

    window.dispatchEvent(new Event("storage"));
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
