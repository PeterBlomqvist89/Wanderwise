"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListingCard from "./components/ListingCard";
import Head from "next/head"; // Import Head

export default function MainPage() {
  const [listings, setListings] = useState([]);
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
      } catch (error) {
        console.error("Error fetching listings:", error);
        if (retryCount > 0) {
          setTimeout(() => fetchListings(retryCount - 1), 100);
        }
      }
    }
    fetchListings();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/listings/${id}`);
  };

  return (
    <>
      <Head>
        <title>Wanderwise</title>
        <meta name="description" content="Find your home away from home" />
      </Head>
      <div className="p-8 max-w-[1000px] mx-auto flex flex-col grid-cols-1 md:grid-cols-3 gap-4 md:grid">
        {listings.map((listing, index) => (
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
