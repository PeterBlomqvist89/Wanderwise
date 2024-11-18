import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { categories } from "../components/Categories"; // Antag att detta är korrekt
import CategoryModal from "./CategoryModal";
import { DateRange } from "react-date-range";
import { useSearch } from "@/app/context/SearchContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchModal = () => {
  const { setSearchParams, setIsSearchActive, isModalOpen, closeModal } =
    useSearch();
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
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  if (!isModalOpen) return null; // Kontrollera om modalen ska visas

  const handleSearch = () => {
    setSearchParams({
      destination,
      category: category ? category.label : null,
      guests: parseInt(guests, 10),
      maxPrice,
      dateRange,
    });
    setIsSearchActive(true);
    closeModal(); // Stäng modalen
  };

  const handleReset = () => {
    setDestination("");
    setCategory(null);
    setGuests(1);
    setMaxPrice("");
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-50">
      <div className="bg-timberwolf mx-6 my-32 p-6 rounded-lg max-w-[730px] w-full max-h-[90vh] overflow-y-auto relative ">
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close search modal"
          className="absolute top-4 right-4 p-2 text-brunswickgreen hover:bg-gray-200 rounded-full"
        >
          <CircleX size={24} />
        </button>

        <h2 className="text-xl font-medium mb-4 font-livvic">
          Where are we headed?
        </h2>

        {/* Rest of the modal content */}
        <div className="flex flex-col gap-4">
          {/* Destination */}
          <div>
            <label className="font-livvic">Destination?</label>
            <input
              type="text"
              placeholder="Choose destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-livvic">Category</label>
            <div
              onClick={() => setCategoryModalOpen(true)}
              className="p-2 border rounded cursor-pointer"
              aria-label="Open category modal"
            >
              {category ? category.label : "Choose a category"}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="font-livvic">Guests?</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-livvic">Price</label>
            <input
              type="text"
              placeholder="Max price..."
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Date Range Picker */}
          <div>
            <label className="font-livvic">Select Dates</label>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              minDate={new Date()}
              rangeColors={["#344e41"]}
            />
          </div>
        </div>

        {/* Show CategoryModal */}
        {isCategoryModalOpen && (
          <CategoryModal
            categories={categories}
            onSelectCategory={(category) => {
              setCategory(category);
              setCategoryModalOpen(false);
            }}
            onClose={() => setCategoryModalOpen(false)}
          />
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleReset}
            className="w-1/2 ml-2 bg-brunswickgreen font-livvic text-white py-2 rounded-lg border-2 border-brunswickgreen hover:bg-timberwolf hover:text-brunswickgreen hover:border-2 hover:border-brunswickgreen"
            aria-label="Reset filter"
          >
            Reset Filter
          </button>
          <button
            onClick={handleSearch}
            className="w-1/2 ml-2 bg-brunswickgreen font-livvic text-white py-2 rounded-lg border-2 border-brunswickgreen hover:bg-timberwolf hover:text-brunswickgreen hover:border-2 hover:border-brunswickgreen"
            aria-label="Start search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
