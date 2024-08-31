import React from "react";
import BlueButton from "./BlueButton";

type SharePicPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SharePicPopup: React.FC<SharePicPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[572px] p-3 rounded-lg flex flex-col justify-center ">
        <div className="flex flex-row justify-between items-center border-b boder-2">
          <div>
            <p className="text-base font-bold">Share A New Picture </p>
          </div>
          <div>
            <button
              onClick={onClose}
              className="text-gray-600 font-normal mb-4 self-end"
            >
              &#10060;
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-3 px-20 py-10">
          <input type="text" className="p-2 border" placeholder="New picture URL" />
          <input type="text" className="p-2 border" placeholder="Title" />
        </div>
        <div className="flex flex-row justify-end space-x-6 pt-4 item-center border-t boder-2">
          <div>
          <button
              onClick={onClose}
              className="text-gray-600 font-normal hover:border-gray-300 rounded-sm
               mb-4 border-2 border-b py-1 px-3 h-10 self-end"
            >
              Cancel
            </button>
          </div>
          <div>
           <BlueButton value="Share" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePicPopup;
