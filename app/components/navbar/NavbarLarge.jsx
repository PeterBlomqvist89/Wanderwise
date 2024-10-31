"use client";

import React from "react";
import Logo from "./Logo";
import LogoFont from "./LogoFont";
import UserMenu from "./UserMenu";
import Searchbar from "./Searchbar";

const NavbarLarge = () => {
  return (
    <nav className="hidden md:flex flex-col items-center w-full h-[150px] py-4 z-20">
      <div className="flex items-center justify-between w-full px-8">
        <Logo />
        <div className="flex flex-col items-center justify-center mx-auto space-y-2">
          <LogoFont />
          <Searchbar />
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};

export default NavbarLarge;
