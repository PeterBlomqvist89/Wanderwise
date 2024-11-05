"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

const LogoSmall = () => {
  const router = useRouter();

  return (
    <nav className="relative flex items-center justify-center md:hidden mt-8">
      {/* CircleArrowLeft positioned absolutely to the left */}
      <CircleArrowLeft
        size={45}
        strokeWidth={1.5}
        color="var(--brunswickgreen)"
        onClick={() => router.back()} // Navigate back on click
        className="absolute left-14 cursor-pointer"
      />
      <Image
        onClick={() => router.push("/")}
        alt="Wanderwise Logo"
        height={54}
        width={120}
        src="/images/logo.png"
        className="cursor-pointer"
      />
    </nav>
  );
};

export default LogoSmall;
