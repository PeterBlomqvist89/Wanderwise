"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Wanderwise find your home away from home"
      height={79}
      width={260}
      src="/images/Font_logo.png"
      className="cursor-pointer"
    />
  );
};

export default Logo;
