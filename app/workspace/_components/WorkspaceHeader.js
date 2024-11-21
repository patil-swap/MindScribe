import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = () => {
  return (
    <div className="p-4 flex justify-between">
      <Image
        src={"/mindscribe.svg"}
        alt="MindScribe Logo"
        width={60}
        height={60}
      />
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;
