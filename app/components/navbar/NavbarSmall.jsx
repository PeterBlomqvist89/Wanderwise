"use client";

import React, { useState } from "react";
import { House, HousePlus, Search, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchModal from "../SearchModal";

const NavbarSmall = () => {
  const router = useRouter();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex md:hidden bg-ferngreen fixed bottom-0 left-0 right-0 h-[78px] items-center justify-around px-8 z-50">
        <House
          onClick={() => router.push("/")}
          color="var(--timberwolf)"
          size={45}
          className="cursor-pointer"
        />
        <Search
          color="var(--timberwolf)"
          size={45}
          className="cursor-pointer"
          onClick={toggleSearchModal}
        />
        <UserRoundPen
          color="var(--timberwolf)"
          size={45}
          className="cursor-pointer"
          onClick={() => router.push("/profile")}
        />
        <HousePlus
          color="var(--timberwolf)"
          size={45}
          className="cursor-pointer"
          onClick={() => router.push("/add-listing")}
        />
      </nav>

      {isSearchModalOpen && <SearchModal onClose={toggleSearchModal} />}
    </>
  );
};

export default NavbarSmall;
