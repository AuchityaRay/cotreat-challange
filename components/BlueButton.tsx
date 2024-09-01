import React from "react";

type ButtonProps = {
  onClick?: () => void;
  value: string;
  href?: string; // Optional href prop
};

const BlueButton: React.FC<ButtonProps> = ({ onClick, value, href }) => {
  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        className="bg-daybreak-blue cursor-pointer hover:bg-blue-600 py-1 px-3 h-10 text-white font-normal text-sm sm:text-base rounded-sm flex items-center justify-center"
      >
        {value}
      </a>
    );
  }

  // Otherwise, render a button element
  return (
    <button
      className="bg-daybreak-blue cursor-pointer hover:bg-blue-600 py-1 px-3 h-10 text-white font-normal text-sm sm:text-base rounded-sm"
      onClick={onClick}
      disabled={!onClick}
    >
      {value}
    </button>
  );
};

export default BlueButton;
