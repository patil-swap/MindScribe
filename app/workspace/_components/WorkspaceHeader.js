import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = ({ fileName }) => {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Image
        src={"/mindscribe.svg"}
        alt="MindScribe Logo"
        width={60}
        height={60}
        className="rounded-full"
      />
      <h2 className="text-3xl text-bold">{fileName}</h2>
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;
