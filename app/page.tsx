import Card from "@/components/Card";
import { LOGIN } from "@/routes/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-6 max-w-6xl w-full py-5 mx-auto">
        <div className="bg-picShare-color text-center p-3 rounded-md">
          <p className="text-base font-normal ">
            <Link href={LOGIN} className="text-daybreak-blue">Login </Link>
            to start sharing your favourite pictures with others!
          </p>
        </div>
        <div>
          <Card/>
          
        </div>
      </div>
    </>
  );
}
