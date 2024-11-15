"use client";

import { useBooking } from "@/app/context/BookingContext";
import Image from "next/image";
import { db, auth } from "../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AmenityList from "@/app/components/AmenityList";
import React, { useEffect, useState } from "react";

const ConfirmPay = () => {
  const { bookingDetails } = useBooking();
  const {
    id,
    checkIn,
    checkOut,
    guests,
    price,
    cleaningFee,
    wanderwiseFee,
    address,
    description,
    amenities,
    images,
  } = bookingDetails;
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        // Redirect to sign-in page if the user is not logged in
        router.push("/auth/sign-in");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const numberOfNights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;
  const totalPrice = price * numberOfNights;
  const grandTotal = totalPrice + cleaningFee + wanderwiseFee;

  // Funktion för att hantera bokning
  const handlePay = async () => {
    if (!currentUser) {
      toast.error("Please log in to complete the booking.");
      return;
    }

    try {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        const isDateAvailable = !existingData.bookings?.some((booking) => {
          const existingStart = new Date(booking.checkIn);
          const existingEnd = new Date(booking.checkOut);
          const newStart = new Date(checkIn);
          const newEnd = new Date(checkOut);

          return (
            (newStart >= existingStart && newStart < existingEnd) ||
            (newEnd > existingStart && newEnd <= existingEnd) ||
            (newStart <= existingStart && newEnd >= existingEnd)
          );
        });

        if (!isDateAvailable) {
          toast.error("Selected dates are already booked.");
          return;
        }

        const updatedBookings = [
          ...(existingData.bookings || []),
          {
            user: currentUser,
            checkIn,
            checkOut,
            guests,
          },
        ];

        await updateDoc(docRef, { bookings: updatedBookings });
        toast.success("Booking confirmed!");
        router.push("/my-reservations");
      } else {
        toast.error("Listing not found.");
      }
    } catch (error) {
      toast.error("Failed to complete booking. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-[1000px] mb-16">
      <h1 className="text-xl font-livvic">{address}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <Image
            src={images[0]?.url || "/images/default-image.jpg"}
            alt="Selected Listing Image"
            width={800}
            height={500}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <p className="font-livvic text-lg">{description}</p>
        </div>
      </div>

      {/* Price Information */}
      <div className="space-y-4 border-t-2 pt-4">
        <h2 className="text-xl font-semibold font-livvic">Price Information</h2>
        <div className="flex justify-between">
          <p className="font-livvic">
            ${price} x {numberOfNights} nights
          </p>
          <p>${totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-livvic">Cleaning Fee</p>
          <p className="font-livvic">${cleaningFee}</p>
        </div>
        <div className="flex justify-between border-b-2 border-brunswickgreen pb-4">
          <p className="font-livvic">Wanderwise Fee</p>
          <p className="font-livvic">${wanderwiseFee}</p>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <p className="font-livvic">Total Price</p>
          <p className="font-livvic">${grandTotal}</p>
        </div>
      </div>

      {/* Your Journey */}
      <div className="border-2 border-brunswickgreen p-4 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold font-livvic">Your Journey</h3>
        <p className="font-livvic">
          Check-in:{" "}
          {new Date(checkIn).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="font-livvic">
          Check-out:{" "}
          {new Date(checkOut).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="font-livvic">Guests: {guests}</p>
        <AmenityList amenities={amenities} />
      </div>

      {/* Payment Section */}
      <div className="space-y-4 border-t-2 pt-4">
        <h2 className="text-xl font-semibold font-livvic">
          Credit Card Details
        </h2>
        <input
          type="text"
          placeholder="Card Number"
          className="p-2 border rounded w-full font-livvic"
        />
        <input
          type="text"
          placeholder="Name on Card"
          className="p-2 border rounded w-full font-livvic"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="p-2 border rounded w-1/2 font-livvic"
          />
          <input
            type="text"
            placeholder="CVV"
            className="p-2 border rounded w-1/2 font-livvic"
          />
        </div>
      </div>

      <button
        onClick={handlePay}
        className="w-full mt-4 bg-brunswickgreen text-white py-2 rounded-lg border-2 border-brunswickgreen hover:bg-timberwolf hover:text-brunswickgreen hover:border-2 hover:border-brunswickgreen"
      >
        Pay Now
      </button>
    </div>
  );
};

export default ConfirmPay;
