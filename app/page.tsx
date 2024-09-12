"use client"
import HomePage from "@/components/HomePage";

import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("useraccess"); // Get access_token from localStorage

   
    if (userId && accessToken) {
      setLoggedIn(true); 
    } else {
      setLoggedIn(false); 
    }

    setLoading(false); 
  }, []);
  if (loading) {
    return null;
  }
  return <HomePage loggedIn={loggedIn}  />;
}
