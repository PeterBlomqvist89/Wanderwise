import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { categories } from "../components/Categories";
import CategoryModal from "./CategoryModal";
import { DateRange } from "react-date-range";
import { useSearch } from "../context/SearchContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchModal = ({ isOpen, onClose }) => {
  const { setSearchParams, setIsSearchActive } = useSearch();
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

  const handleSearch = () => {
    setSearchParams({
      destination,
      category: category ? category.label : null,
      guests,
      maxPrice,
      dateRange,
    });
    setIsSearchActive(true);
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-y-auto">
      <div className="bg-timberwolf p-6 rounded-lg max-w-[730px] w-full max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="relative left-[660px] mb-4">
          <CircleX color="var(--brunswickgreen)" size={20} className="" />
        </button>
        <h2 className="text-xl font-medium mb-4 font-livvic ">
          Where are we headed?
        </h2>

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
              onChange={(e) => setGuests(e.target.value)}
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

          {/* Kalender med start- och slutdatum */}
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

        {/* Visa CategoryModal */}
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
          >
            Reset Filter
          </button>
          <button
            onClick={handleSearch}
            className="w-1/2 ml-2 bg-brunswickgreen font-livvic text-white py-2 rounded-lg border-2 border-brunswickgreen hover:bg-timberwolf hover:text-brunswickgreen hover:border-2 hover:border-brunswickgreen"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
