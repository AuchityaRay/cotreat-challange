"use client";

import Image from "next/image";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup";
import useAuth from "@/hooks/useAuth";

type Props = {};

const Card = (props: Props) => {
  const { isLoggedIn, username, logout } = useAuth();
  const [IsModalopen, setIsModalOpen] = useState(false);
  const [selectImage, setSelectImage] = useState<string>("");
  const [SelectDescription, setSelectDescription] = useState<string>("");

  const handleImageClick = (imageSrc: string, ImageDescription: string) => {
    setSelectImage(imageSrc);
    setSelectDescription(ImageDescription);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        
        <div
          className="flex flex-col space-y-4 justify-center shadow-custom-drop  p-3
      bg-white w-[220px] h-[313px] rounded-xl mx-auto"
          onClick={() =>
            handleImageClick("/elephant.png", "Neekey Ni\n09/12/2024")
          }
        >
          <Image
            src="/elephant.png"
            width={200}
            height={200}
            alt="card_image"
            className=""
          />
          <h2 className="font-bold text-base text-center ">
            What a quiet Elephant!
          </h2>
        
          <div className= {`${isLoggedIn ? " justify-between " : "justify-center"}flex flex-row items-center`}>

            <p className="text-[14px] text-center font-normal text-gray-500">
              Neekey Ni <br />
              09/12/2024
            </p>
  {isLoggedIn && (
           
              <div className="">
              <Image
                src="/icon/filled-heart.svg"
                width={20}
                height={20}
                className=""
                alt="icon"
              />
              <Image
                src="/icon/unfilled-heart.svg"
                width={20}
                height={20}
                className=""
                alt="icon"
              />
            </div>
        ) }
        
          </div>
        </div>
       
      
      </div>
      <ImagePopup
        isOpen={IsModalopen}
        onClose={closeModal}
        imageSrc={selectImage}
        imageDescription={SelectDescription}
      />
    </>
  );
};

export default Card;
