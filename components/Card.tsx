"use client";
import Image from "next/image";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup";

type Props = {};

const Card = (props: Props) => {
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
          className="flex flex-col space-y-4 justify-center shadow-custom-drop items-center p-3 
      bg-white w-[220px] h-[313px] rounded-xl mx-auto"
          onClick={() => handleImageClick("/elephant.png", "Neekey Ni\n09/12/2024" )}
        >
          <Image
            src="/elephant.png"
            width={200}
            height={200}
            alt="card_image"
            className=""
          />
          <h2 className="font-bold text-base">What a quiet Elephant!</h2>
          <p className="text-[14px] text-center font-normal text-gray-500">
            Neekey Ni <br />
            09/12/2024
          </p>
        </div>
        {/* Repeat the card structure for other cards */}
        <div className="flex flex-col space-y-4 justify-center shadow-custom-drop items-center p-3 bg-white w-[220px] h-[313px] rounded-xl mx-auto">
          <Image
            src="/elephant.png"
            width={200}
            height={200}
            alt="card_image"
            className=""
          />
          <h2 className="font-bold text-base">What a quiet Elephant!</h2>
          <p className="text-[14px] text-center font-normal text-gray-500">
            Neekey Ni <br />
            09/12/2024
          </p>
        </div>
        <div className="flex flex-col space-y-4 justify-center shadow-custom-drop items-center p-3 bg-white w-[220px] h-[313px] rounded-xl mx-auto">
          <Image
            src="/elephant.png"
            width={200}
            height={200}
            alt="card_image"
            className=""
          />
          <h2 className="font-bold text-base">What a quiet Elephant!</h2>
          <p className="text-[14px] text-center font-normal text-gray-500">
            Neekey Ni <br />
            09/12/2024
          </p>
        </div>
        <div className="flex flex-col space-y-4 justify-center shadow-custom-drop items-center p-3 bg-white w-[220px] h-[313px] rounded-xl mx-auto">
          <Image
            src="/elephant.png"
            width={200}
            height={200}
            alt="card_image"
            className=""
          />
          <h2 className="font-bold text-base">What a quiet Elephant!</h2>
          <p className="text-[14px] text-center font-normal text-gray-500">
            Neekey Ni <br />
            09/12/2024
          </p>
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
