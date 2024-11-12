"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListingCard from "./components/ListingCard";
import Head from "next/head"; // Import Head
import { useSearch } from "./context/SearchContext";

export default function MainPage() {
  const { searchTerm } = useSearch();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchListings(retryCount = 3) {
      try {
        const response = await fetch("/api/listings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListings(data);
        setFilteredListings(data); // Initialt sätts filtrerade listningar till alla listningar
      } catch (error) {
        console.error("Error fetching listings:", error);
        if (retryCount > 0) {
          setTimeout(() => fetchListings(retryCount - 1), 100);
        }
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing) =>
        listing.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredListings(filtered);
    }
  }, [searchTerm, listings]);

  const handleCardClick = (id) => {
    router.push(`/listings/${id}`);
  };

  return (
    <>
      <Head>
        <title>Wanderwise</title>
        <meta name="description" content="Find your home away from home" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div className="p-8 max-w-[1000px] mx-auto flex flex-col grid-cols-1 md:grid-cols-3 gap-4 md:grid">
        {filteredListings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            variant={index % 5 === 3 ? "wide" : "standard"}
            onClick={() => handleCardClick(listing.id)}
          />
        ))}
      </div>
    </>
  );
}
