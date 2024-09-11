import HomePage from "@/components/HomePage"; // This will be the client-side component
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  const loggedIn = !!userId;

  return <HomePage loggedIn={loggedIn} />;
}
