"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Avatar from "@/app/components/Avatar";
import { CircleArrowLeft, CircleArrowRight, CircleX } from "lucide-react";
import AmenityList from "@/app/components/AmenityList";

const Listings = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", id);
      const listingDoc = await getDoc(docRef);
      if (listingDoc.exists()) {
        setListing(listingDoc.data());
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  const numberOfNights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;
  const totalPrice = listing.price * numberOfNights;
  const cleaningFee = listing.cleaning_fee || 0;
  const wanderwiseFee = listing.wanderwise_fee || 0;
  const grandTotal = totalPrice + cleaningFee + wanderwiseFee;

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-[1000px]  mb-8">
      <h1 className="text-xl font-semibold -mb-6">{listing.address}</h1>

      {/* Images and Description side by side */}
      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Images Section */}
        <div className="lg:w-2/3 w-full space-y-3 ">
          <div className="w-full">
            <img
              src={listing.images[0]?.url}
              alt="Main Listing Image"
              className="w-full h-64 object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(0)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {listing.images.slice(1, 3).map((image, index) => (
              <img
                key={index + 1}
                src={image.url || "/images/default-image.jpg"}
                alt={`Listing Image ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(index + 1)}
              />
            ))}
          </div>

          {/* Price per night under the two images */}
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Price per night: ${listing.price}
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="lg:w-1/3 w-full space-y-4">
          <p className="border-b-2 border-gray-500 pb-8">
            {listing.description}
          </p>
          <AmenityList amenities={listing.amenities} />
          <div className="border-2 text-sm font-light border-brunswickgreen p-4 rounded-xl">
            <p>{listing.cancellation_policy}</p>
          </div>
        </div>
      </div>

      {/* Modal for image gallery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white"
          >
            <CircleX size={32} />
          </button>
          <div className="relative">
            <img
              src={listing.images[currentImageIndex]?.url}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full max-w-lg h-auto rounded-lg"
            />
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              <CircleArrowLeft size={32} />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              <CircleArrowRight size={32} />
            </button>
          </div>
        </div>
      )}

      {/* Map and Host Info */}
      <div className="flex space-x-8">
        <div className="w-full lg:w-1/2 p-4 border rounded-lg">
          <Avatar
            avatarUrl={listing.owner[0]?.avatar || "/images/default-avatar.jpg"}
            className="mb-4"
          />
          <h3 className="text-lg font-semibold">{listing.owner[0]?.name}</h3>
          <p>{listing.owner[0]?.contact}</p>
        </div>
      </div>

      <hr className="my-8" />

      {/* Booking Details */}
      <div className="p-8 border rounded-lg space-y-4">
        <div className="flex justify-between">
          <p className="text-lg">Price per night</p>
          <p className="text-lg font-semibold">${listing.price}</p>
        </div>

        <div className="flex justify-between items-center space-y-2">
          <label>Guests:</label>
          <input
            type="number"
            min="1"
            max={listing.max_guests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label>Check-in Date:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label>Check-out Date:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* Price Calculation */}
        <div className="space-y-2 ">
          <div className="flex justify-between ">
            <p>
              ${listing.price} x {numberOfNights} nights
            </p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Cleaning Fee</p>
            <p>${cleaningFee}</p>
          </div>
          <div className="flex justify-between">
            <p>Wanderwise Fee</p>
            <p>${wanderwiseFee}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <p>Total Price</p>
            <p>${grandTotal}</p>
          </div>
        </div>

        <button className="w-full mt-4 bg-brunswickgreen text-white py-2 rounded-lg">
          Book Here
        </button>
      </div>
    </div>
  );
};

export default Listings;
