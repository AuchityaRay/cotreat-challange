import { useState, useEffect } from "react";

type SharedImage = {
  id: string;
  imageUrl: string;
  imageTitle: string;
  username: string;
  date: string;
};

const useSharedImages = () => {
  const [images, setImages] = useState<SharedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3000/shared-images", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        imageTitle: item.imageTitle,
        username: item.user.username,
        date: new Date(item.createdAt).toLocaleDateString("en-GB"), // Formatting date to dd/mm/yy
      }));

      return formattedData;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const newImages = await fetchImages();
        if (JSON.stringify(newImages) !== JSON.stringify(images)) {
          setImages(newImages);  
        }
      } catch (fetchError) {
        setError((fetchError as Error).message);
      } finally {
        setLoading(false);
      }
    }, 3000); 

    return () => clearInterval(intervalId);  
  }, [images]);

  return { images, loading, error };
};

export default useSharedImages;
