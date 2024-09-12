import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Retrieve userId and accessToken once when the hook is initialized
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("useraccess");

  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId || !accessToken) return;

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add Bearer token in headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          const favoriteMap = data.reduce((acc: any, image: any) => {
            acc[image.id] = true;
            return acc;
          }, {});
          setFavorites(favoriteMap);
        } else {
          console.error("Failed to fetch favorite statuses.");
        }
      } catch (error) {
        console.error("Error loading favorite statuses:", error);
      }
    };

    loadFavorites();
  }, [userId, accessToken]); // Only run the effect when userId or accessToken changes

  const toggleFavorite = async (imageId: string) => {
    if (!userId || !accessToken) {
      alert("You need to be logged in to manage favorites.");
      return;
    }

    const isFavorited = favorites[imageId];

    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/favorites/${imageId}`,
        {
          method: isFavorited ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add Bearer token in headers
          },
        }
      );

      if (response.ok) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [imageId]: !isFavorited,
        }));
      } else {
        alert(`Failed to ${isFavorited ? "remove from" : "add to"} favorites.`);
      }
    } catch (error) {
      console.error(`Error ${isFavorited ? "removing from" : "adding to"} favorites:`, error);
      alert(`An error occurred while ${isFavorited ? "removing from" : "adding to"} favorites.`);
    }
  };

  return {
    favorites,
    toggleFavorite,
  };
};

export default useFavorites;
