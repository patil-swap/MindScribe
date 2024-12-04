"use client";
import { Button } from "@/components/ui/button";
import { Layout, ShieldPlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const SideBar = () => {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.getUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress
  });
  return (
    <div className="shadow-md h-screen p-2">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image
          src={"/mindscribe.svg"}
          alt="MindScribe Logo"
          height={60}
          width={60}
          className="rounded-full"
        />
        <span className="text-2xl">MindScribe</span>
      </div>
      <div className="mt-10">
        <UploadPdfDialog>
          <Button className="w-full">Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 items-center p-3 mt-3 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-3 hover:bg-slate-100 rounded-lg cursor-pointer">
          <ShieldPlus />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-20 w-[85%]">
        <p className="text-lg text-center">Uploaded {fileList?.length} PDFs</p>
        <p className="text-sm mt-2 text-center">
          Upgrade to upload unlimited PDFs
        </p>
      </div>
    </div>
  );
};

export default SideBar;
