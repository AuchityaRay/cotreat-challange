"use client";

import Card from "@/components/Card";
import { LOGIN } from "@/routes/routes";
import Link from "next/link";

interface HomePageProps {
  loggedIn: boolean;

}

export default function HomePage({ loggedIn }: HomePageProps) {
  return (
    <div className="flex flex-col space-y-6 max-w-6xl w-full py-5 mx-auto">
      {!loggedIn && (
        <div className="bg-picShare-color text-center p-3 rounded-md">
          <p className="text-base font-normal">
            <Link href={LOGIN} className="text-daybreak-blue">
              Login{" "}
            </Link>
            to start sharing your favorite pictures with others!
          </p>
        </div>
      )}
      <div>
        <Card />
      </div>
    </div>
  );
}
