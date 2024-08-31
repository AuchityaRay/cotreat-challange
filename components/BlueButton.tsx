import React from "react";

type ButtonProps = {
  onClick?: () => void; // Function to handle the button click
  value: string;       // Text to be displayed on the button
};

const BlueButton: React.FC<ButtonProps> = ({ onClick, value }) => {
  return (
    <button
      className="bg-daybreak-blue cursor-pointer hover:bg-blue-600 py-1 px-3 h-10 text-white font-normal text-sm sm:text-base rounded-sm"
      onClick={onClick} disabled={!onClick} 
    >
      {value}
    </button>
  );
};

export default BlueButton;
