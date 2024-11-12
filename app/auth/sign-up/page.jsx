"use client";

import FormInput from "@/app/components/FormInputSignUp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen -mt-28 ">
      <div className="flex flex-col w-full max-w-[1190px] h-[600px] overflow-hidden mx-6 ">
        <div className="md:hidden flex justify-center"></div>

        <div className="flex flex-1 ">
          <div className="flex-[1.5] md:block hidden">
            <Image
              src="/images/register2.jpg"
              alt="Background"
              height={600}
              width={714}
              className="w-full h-full object-cover"
            />
          </div>

          <FormInput />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
