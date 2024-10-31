// app/MainPage.js
"use client";
import { useEffect, useState } from "react";
import ListingCard from "./components/ListingCard";

export default function MainPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch("/api/listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }
    fetchListings();
  }, []);

  return (
    <div className="p-8 max-w-[996px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      {listings.map((listing, index) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          variant={index % 5 === 3 ? "wide" : "standard"}
        />
      ))}
    </div>
  );
}
