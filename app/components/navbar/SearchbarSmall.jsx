import { useSearch } from "@/app/context/SearchContext";
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchbarSmall = () => {
  const { setSearchTerm } = useSearch();
  const [searchTerm, setLocalSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setLocalSearchTerm(term);
    setSearchTerm(term);
  };

  return (
    <div className="flex md:hidden top-0 left-0 right-0 h-[50px] px-28 py-12 items-center z-50">
      <div className="relative flex-grow">
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
    </div>
  );
};

export default SearchbarSmall;
