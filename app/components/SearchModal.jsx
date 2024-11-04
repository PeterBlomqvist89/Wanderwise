import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { categories } from "../components/Categories";
import CategoryModal from "./CategoryModal";
// import LeafletMap from "./LeafletMap"; // Importera Leaflet-kartan

const SearchModal = ({ isOpen, onClose }) => {
  const [destination, setDestination] = useState(""); // Initialize with empty string
  const [category, setCategory] = useState(null);
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(""); // Initialize with empty string
  const [startDate, setStartDate] = useState(""); // Initialize with empty string
  const [endDate, setEndDate] = useState(""); // Initialize with empty string
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-timberwolf p-6 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="relative left-96">
          <CircleX size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Where are we headed?</h2>

        <div className="flex flex-col gap-4">
          {/* Destination */}
          <div>
            <label>Destination?</label>
            <input
              type="text"
              placeholder="Choose destination..."
              value={destination}
              //   onClick={() => <LeafletMap onSelect={setDestination} />}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label>Category</label>
            <div
              onClick={() => setCategoryModalOpen(true)}
              className="p-2 border rounded cursor-pointer"
            >
              {category ? category.label : "Choose a category"}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label>Guests?</label>
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
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter price range..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Calendar Start and End Dates */}
          <div className="flex gap-4">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Visa CategoryModal */}
        {isCategoryModalOpen && (
          <CategoryModal
            categories={categories} // Definiera `categories` i en lista med ikoner och etiketter
            onSelectCategory={(category) => {
              setCategory(category);
              setCategoryModalOpen(false);
            }}
            onClose={() => setCategoryModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
export default SearchModal;
