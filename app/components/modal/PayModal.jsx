"use client";

import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

const PayModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      style={{ top: "-50px" }}
    >
      <div className="relative  max-w-[600px] h-[80%] mx-8">
        <Image
          src="/images/fireplace.JPG"
          alt="Fireplace Background"
          fill
          objectFit="cover"
          className="absolute inset-0 rounded-xl"
        />
        <div className="relative z-10 text-center p-8 space-y-6 text-white">
          <Image
            src="/images/Font_logo_Ljus.png"
            width={260}
            height={79}
            alt="WanderWise Logo"
            className=" mx-auto"
          />
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-ferngreen rounded-full">
            <CircleCheck size={55} color="white" />
          </div>
          <div className="bg-opacity-90 bg-timberwolf rounded-xl p-8">
            <h2 className="text-lg font-bold font-livvic text-black border-b-2 border-black pb-5 mb-6 ">
              Payment Successful!
            </h2>
            <p className=" text-black font-livvic">
              Thank you for your booking. Your adventure is just around the
              corner! A confirmation has been sent to your email with all the
              details of your stay. Thank you for choosing WanderWise!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayModal;
