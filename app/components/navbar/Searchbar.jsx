import { Search, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { useSearch } from "@/app/context/SearchContext";

const Searchbar = () => {
  const { setSearchTerm, openModal } = useSearch(); // Hämta global modalöppning
  const [searchTerm, setLocalSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setLocalSearchTerm(value);
    setSearchTerm(value); // Uppdatera global sökterm
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
          <Search color="var(--timberwolf)" size={28} />
        </div>
      </div>
      <Settings2
        color="var(--brunswickgreen)"
        size={28}
        className="ml-2 cursor-pointer"
        onClick={openModal} // Använd global modalöppning
      />
    </div>
  );
};

export default Searchbar;
