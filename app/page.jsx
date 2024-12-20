"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListingCard from "./components/ListingCard";
import Head from "next/head";
import { useSearch } from "./context/SearchContext";
import { CircleX } from "lucide-react";
import LoadingModal from "@/app/components/modal/LoadingModal";

export default function MainPage() {
  const {
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
  } = useSearch();

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchListings() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/listings");
        const data = await response.json();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    const filterListings = () => {
      let filtered = listings;

      if (isSearchActive || searchTerm) {
        if (searchTerm) {
          filtered = filtered.filter((listing) =>
            listing.address?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (destination) {
          filtered = filtered.filter((listing) =>
            listing.address?.toLowerCase().includes(destination.toLowerCase())
          );
        }

        if (category) {
          filtered = filtered.filter(
            (listing) => listing.property_type?.label === category
          );
        }

        if (guests) {
          filtered = filtered.filter((listing) => listing.max_guests >= guests);
        }

        if (maxPrice) {
          filtered = filtered.filter(
            (listing) => listing.price <= Number(maxPrice)
          );
        }

        if (dateRange && dateRange[0]) {
          const { startDate, endDate } = dateRange[0];
          filtered = filtered.filter(
            (listing) =>
              !listing.bookings ||
              listing.bookings.every((booking) => {
                const bookingStart = new Date(booking.checkIn);
                const bookingEnd = new Date(booking.checkOut);
                return bookingEnd < startDate || bookingStart > endDate;
              })
          );
        }
      }

      setFilteredListings(filtered);
    };

    filterListings();
  }, [
    searchTerm,
    destination,
    category,
    guests,
    maxPrice,
    dateRange,
    isSearchActive,
    listings,
  ]);

  const handleClearSearch = () => {
    setIsSearchActive(false);
    setSearchTerm("");
    setSearchParams({
      destination: "",
      category: null,
      guests: 1,
      maxPrice: "",
      dateRange: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ],
    });
    setFilteredListings(listings);
  };

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

      <LoadingModal isLoading={isLoading} />

      <div className="p-8 max-w-[1000px] mx-auto mb-20">
        {isSearchActive && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleClearSearch}
              className="flex items-center text-brunswickgreen"
            >
              <CircleX size={20} className="mr-1" />
              Clear Search
            </button>
          </div>
        )}

        <div className="flex flex-col grid-cols-1 md:grid-cols-3 gap-4 md:grid hover:cursor-pointer">
          {filteredListings.map((listing, index) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              variant={index % 5 === 3 ? "wide" : "standard"}
              onClick={() => handleCardClick(listing.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
