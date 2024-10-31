import React from "react";

const Footer = () => {
  return (
    <footer className="bg-grey h-[66px] text-timberwolf py-4 text-sm md:block hidden">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center space-x-2">
          <p className="text-2xl">WanderWise</p>
          <p className="font-light text-xl">Find your home away from home</p>
        </div>
        <p className="font-light text-sm">
          ©2024 WanderWise. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
