"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.getUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress
  });

  return (
    <div>
      <h2 className="font-medium text-3xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList?.length > 0
          ? fileList?.map((file, index) => (
              <Link key={index} href={"/workspace/" + file.fileId}>
                <div className="flex p-5 shadow-md bg-gray-300 rounded-md flex-col items-center justify-center border hover:scale-105 transition-all hover:bg-slate-300">
                  <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                  <h2 className="mt-3 font-medium">{file.fileName}</h2>
                  <h2>{new Date(file._creationTime).toLocaleString()}</h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
