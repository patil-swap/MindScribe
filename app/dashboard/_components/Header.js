import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-end px-5 py-3 shadow-sm">
      <UserButton />
    </div>
  );
};

export default Header;
