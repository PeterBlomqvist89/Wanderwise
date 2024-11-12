import { Search, Settings2 } from "lucide-react";
import React, { useState } from "react";
import SearchModal from "../SearchModal";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Skicka sökordet till MainPage
  };

  return (
    <div className="flex items-center">
      <div className="relative flex-grow w-[500px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full h-9 bg-brunswickgreen text-timberwolf placeholder-timberwolf px-4 py-2 rounded-xl focus:outline-none"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Search color="var(--timberwolf)" size={28} className="" />
        </div>
      </div>
      <Settings2
        color="var(--brunswickgreen)"
        size={28}
        className="ml-2 cursor-pointer"
        onClick={() => setModalOpen(true)}
      />
      <SearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Searchbar;
