import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import ImagePopup from "@/components/ImagePopup";
import useAuth from "@/hooks/useAuth";
import useSharedImages from "@/hooks/useSharedImages";
import useFavorites from "@/hooks/useFavorites";


type CardProps = {
  favoritesOnly?: boolean;
};


const SkeletonCard = () => (
  <div className="flex flex-col space-y-4 justify-center shadow-custom-drop p-3 bg-white w-[220px] h-[313px] rounded-xl mx-auto animate-pulse">
    <div className="bg-gray-300 w-full h-48 rounded-lg"></div>
    <div className="bg-gray-300 w-full h-6 rounded"></div>
    <div className="bg-gray-300 w-full h-4 rounded"></div>
  </div>
);

// Apply the CardProps type to the Card component
const Card: React.FC<CardProps> = ({ favoritesOnly = false }) => {
  const { isLoggedIn } = useAuth();
  const { images, loading, error } = useSharedImages();
  const { favorites, toggleFavorite } = useFavorites();
  const [IsModalopen, setIsModalOpen] = useState(false);
  const [selectImage, setSelectImage] = useState<string>("");
  const [selectUsername, setSelectUsername] = useState<string>("");
  const [selectDate, setSelectDate] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  const handleImageClick = (imageSrc: string, username: string, date: string) => {
    setSelectImage(imageSrc);
    setSelectUsername(username);
    setSelectDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const lastImageElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("lazy-load");
          observer.current?.unobserve(entry.target);
        }
      });
    });

    if (node) observer.current.observe(node);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const displayedImages = favoritesOnly
    ? images.filter((image) => favorites[image.id])
    : images;

  if (displayedImages.length === 0) {
    return <p className="text-center text-gray-500">No favorite pictures found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayedImages.map((image, index) => (
          <div
            key={image.id}
            className="flex flex-col space-y-4 justify-center shadow-custom-drop p-3 bg-white w-[220px] 
            h-[313px] rounded-xl mx-auto lazy-load"
            ref={lastImageElementRef}
          >
            <Image
              src={image.imageUrl}
              width={500}
              height={500}
              alt="card_image"
              className="w-64 h-64 object-cover"
              onClick={() => handleImageClick(image.imageUrl, image.username, image.date)}
            />
            <h2 className="font-bold text-base text-center">
              {image.imageTitle}
            </h2>

            <div
              className={`${
                isLoggedIn ? "justify-between" : "justify-center"
              } flex flex-row item-center`}
            >
              <p className="text-[14px] text-left font-normal text-gray-500">
                {image.username} <br />
                {image.date}
              </p>
              {isLoggedIn && (
                <div onClick={() => toggleFavorite(image.id)}>
                  {favorites[image.id] ? (
                    <Image
                      src="/icon/filled-heart.svg"
                      width={20}
                      height={20}
                      alt="filled-heart-icon"
                    />
                  ) : (
                    <Image
                      src="/icon/unfilled-heart.svg"
                      width={20}
                      height={20}
                      alt="unfilled-heart-icon"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ImagePopup
        isOpen={IsModalopen}
        onClose={closeModal}
        imageSrc={selectImage}
        username={selectUsername}
        date={selectDate}
      />
    </>
  );
};

export default Card;
