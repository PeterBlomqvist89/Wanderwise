import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-6 rounded-lg flex items-center justify-center">
          <LoaderCircle
            size={48}
            className="animate-spin text-brunswickgreen"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
