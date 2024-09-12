import React, { useState } from "react";
import BlueButton from "./BlueButton";

type SharePicPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SharePicPopup: React.FC<SharePicPopupProps> = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShared, setIsShared] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("useraccess"); // Get the access token from localStorage

    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    if (!imageUrl || !imageTitle) {
      setError("Please provide both an image URL and a title.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/shared-images/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the Bearer token in the headers
        },
        body: JSON.stringify({
          imageTitle,
          imageUrl,
        }),
      });

      if (response.ok) {
        // Success: Show success message and hide input fields
        setIsShared(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to share the picture.");
      }
    } catch (error) {
      setError("An error occurred while sharing the picture.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setImageTitle("");
    setError(null);
    setIsShared(false);
    onClose();
  };

  return (
    <div className="fixed -inset-3 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[572px] p-3 rounded-lg flex flex-col justify-center">
        <div className="flex flex-row justify-between items-center pb-3 border-b-2">
          <p className="text-base font-bold">
            {isShared ? "Success!" : "Share A New Picture"}
          </p>
          <button
            onClick={handleClose}
            className="text-gray-600 font-normal mb-4 self-end"
          >
            &#10060;
          </button>
        </div>

        {isShared ? (
          <div className="flex flex-col items-center justify-center p-10">
            <p className="text-green-600 font-bold text-lg">
              Image shared successfully!
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 px-20 py-10">
            <input
              type="text"
              className="p-2 border"
              placeholder="New picture URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <input
              type="text"
              className="p-2 border"
              placeholder="Title"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}

        <div className="flex flex-row justify-end space-x-6 pt-4 item-center border-t-2">
          {!isShared && (
            <button
              onClick={handleClose}
              className="text-gray-600 font-normal hover:border-gray-300 rounded-sm
               mb-4 border-2 border-b py-1 px-3 h-10 self-end"
            >
              Cancel
            </button>
          )}
          {!isShared && (
            <BlueButton
              value={isLoading ? "Sharing..." : "Share"}
              onClick={handleShare}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharePicPopup;
