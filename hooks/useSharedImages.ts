import { useState, useEffect } from "react";
import io from "socket.io-client";  // Import socket.io-client for WebSocket

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
        date: new Date(item.createdAt).toLocaleDateString("en-GB"), 
      }));

      return formattedData;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  useEffect(() => {
    const initializeImages = async () => {
      try {
        const initialImages = await fetchImages();
        setImages(initialImages);
      } catch (fetchError) {
        setError((fetchError as Error).message);
      } finally {
        setLoading(false);
      }
    };

   
    initializeImages();

   
    const socket = io('http://localhost:3000');  

   
    socket.on('newImage', (newImage: SharedImage) => {
      console.log('New image received via WebSocket:', newImage);

     
      setImages((prevImages) => [newImage, ...prevImages]);
    });

   
    return () => {
      socket.disconnect();  
    };
  }, []);

  return { images, loading, error };
};

export default useSharedImages;
