import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null; // Om inte laddning, returnera ingenting

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className=" p-6 rounded-lg flex items-center justify-center">
        <LoaderCircle size={48} className="animate-spin text-brunswickgreen" />
      </div>
    </div>
  );
};

export default LoadingModal;
