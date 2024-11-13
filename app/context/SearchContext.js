import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState(null);
  const [guests, setGuests] = useState(1);
  const [maxPrice, setMaxPrice] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const setSearchParams = ({
    destination,
    category,
    guests,
    maxPrice,
    dateRange,
  }) => {
    setDestination(destination);
    setCategory(category);
    setGuests(guests);
    setMaxPrice(maxPrice);
    setDateRange(dateRange);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        destination,
        category,
        guests,
        maxPrice,
        dateRange,
        isSearchActive,
        setIsSearchActive,
        setSearchParams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
