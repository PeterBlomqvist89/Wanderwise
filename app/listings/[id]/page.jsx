"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const DetailPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

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

  // Calculation for total price
  const numberOfNights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;
  const totalPrice = listing.price * numberOfNights;
  const cleaningFee = listing.cleaning_fee || 0;
  const wanderwiseFee = listing.wanderwise_fee || 0;
  const grandTotal = totalPrice + cleaningFee + wanderwiseFee;

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-[1000px]">
      {/* Location and Images */}
      <h1 className="text-3xl font-bold">{listing.location.address}</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <img
            src={listing.images[0]?.url}
            alt="Main Listing Image"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={listing.images[1]?.url || "/images/default-image.jpg"}
            alt="Listing Image 2"
            className="w-full h-40 object-cover rounded-lg"
          />
          <img
            src={listing.images[2]?.url || "/images/default-image.jpg"}
            alt="Listing Image 3"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Price per night and Description */}
      <div className="flex space-x-8">
        <div>
          <p className="text-xl font-semibold">
            Price per night: ${listing.price}
          </p>
        </div>
        <div className="flex-1 space-y-4">
          <p>{listing.description}</p>
          <hr className="my-4" />
          <h2 className="text-xl font-semibold">Amenities</h2>
          <ul className="list-disc list-inside space-y-1">
            {listing.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <hr className="my-4" />
          <h2 className="text-xl font-semibold">Cancellation Policy</h2>
          <p>{listing.cancellation_policy}</p>
        </div>
      </div>

      {/* Map and Host Info */}
      {/* <div className="flex space-x-8">
        <MapContainer
          center={[listing.location.latitude, listing.location.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-1/2 h-64 rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[listing.location.latitude, listing.location.longitude]}
          />
        </MapContainer>
        <div className="w-1/2 p-4 border rounded-lg">
          <Avatar
            size={64}
            src={listing.owner[0]?.avatar || "/images/default-avatar.jpg"}
            className="mb-4"
          />
          <h3 className="text-lg font-semibold">{listing.owner[0]?.name}</h3>
          <p>{listing.owner[0]?.contact}</p>
        </div>
      </div>

      <hr className="my-8" /> */}

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
        <div className="space-y-2">
          <div className="flex justify-between">
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

export default DetailPage;
