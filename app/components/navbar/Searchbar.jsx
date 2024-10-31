import { Search, Settings2 } from "lucide-react";
import React from "react";

const Searchbar = () => {
  return (
    <div className="flex items-center">
      <div className="relative flex-grow w-[500px]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 bg-brunswickgreen text-timberwolf placeholder-timberwolf px-4 py-2 rounded-xl focus:outline-none"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Search
            color="var(--timberwolf)"
            size={28}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Settings2
        color="var(--brunswickgreen)"
        size={28}
        className="ml-2 cursor-pointer"
      />
    </div>
  );
};

export default Searchbar;
