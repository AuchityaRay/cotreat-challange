import Image from "next/image";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  username: string;
  date: string;
};

const ImagePopup: React.FC<ModalProps> = ({ isOpen, onClose,  imageSrc,
  username,
  date, }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-3 rounded-lg">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-6 text-white text-base font-normal">
            <p>{username}  </p> <p>{ date}</p>

            </div>
            
        <button
          onClick={onClose}
          className="text-white font-normal mb-4 self-end"
        >
         &#10060;
        </button>
        </div>
       <div className="px-12">
       <Image
          src={imageSrc}
          width={500}
          height={500}
          alt="card_image"
          className="max-w-full max-h-full"
        />
       </div>
       
      </div>
    </div>
  );
};

export default ImagePopup;
