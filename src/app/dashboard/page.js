"use client";
import Breadcrums from "@/components/Breadcrums";
import { useRouter } from "next/navigation";
import Options from "@/components/Options";
import withAuth from "@/components/withAuth.js";


const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
        <div className="px-4 flex justify-between text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
        <Options />
      </div>
      <div className="flex w-[80%] mx-auto mt-4 flex-col">
        <h2 className="mt-10">Dashboard</h2>
        <div className="flex flex-wrap justify-start">
          {["Gallery", "Anouncement", "Marque", "Slideshow"].map((d) => (
            <div
              key={d.charAt}
              onClick={() => router.push(`/dashboard/${d.toLowerCase()}`)}
              className="w-[150px] h-[150px] bg-blue-800 m-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:scale-105 transition-transform active:scale-100"
            >
              <h3 key={d.charAt} className="text-white">
                {d}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
