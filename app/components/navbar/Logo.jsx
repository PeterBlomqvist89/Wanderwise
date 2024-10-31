"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Wanderwise Logo"
      height={54}
      width={120}
      src="/images/logo.png"
      className="cursor-pointer"
    />
  );
};

export default Logo;
