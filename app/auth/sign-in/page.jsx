"use client";

import FormInputSignIn from "@/app/components/FormInputSignIn";
import Logo from "@/app/components/navbar/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SignIn = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen -mt-28">
      <div className="flex flex-col w-full max-w-[1190px] h-[600px] overflow-hidden">
        <div className="md:hidden flex justify-center mb-4">
          <Logo />
        </div>

        <div className="flex flex-1">
          <div className="flex-[1.5] md:block hidden">
            <Image
              src="/images/login.jpg"
              alt="Background"
              height={600}
              width={714}
              className="w-full h-full object-cover"
            />
          </div>

          <FormInputSignIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
