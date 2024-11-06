"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

const ConfirmPay = () => {
  const searchParams = useSearchParams();

  // Hämta värden från URL-parametrarna
  const id = searchParams.get("id");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const price = parseFloat(searchParams.get("price") || "0");
  const cleaningFee = parseFloat(searchParams.get("cleaningFee") || "0");
  const wanderwiseFee = parseFloat(searchParams.get("wanderwiseFee") || "0");
  const address = searchParams.get("address");
  const description = searchParams.get("description");

  // Beräkna antalet nätter och totalpriset
  const numberOfNights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;
  const totalPrice = price * numberOfNights;
  const grandTotal = totalPrice + cleaningFee + wanderwiseFee;

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-[1000px] mb-16">
      <h1 className="text-2xl font-semibold">{address}</h1>

      {/* Bild och beskrivning */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <Image
            width={500}
            height={500}
            src="/images/default-image.jpg" // Justera till korrekt bildkälla
            alt="Selected Listing Image"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <p>{description}</p>
        </div>
      </div>

      {/* Prisinformation */}
      <div className="space-y-4 border-t-2 pt-4">
        <h2 className="text-xl font-semibold">Price Information</h2>
        <div className="flex justify-between">
          <p>
            ${price} x {numberOfNights} nights
          </p>
          <p>${totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p>Cleaning Fee</p>
          <p>${cleaningFee}</p>
        </div>
        <div className="flex justify-between border-b-2 border-brunswickgreen pb-4">
          <p>Wanderwise Service Fees</p>
          <p>${wanderwiseFee}</p>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <p>Total Price</p>
          <p>${grandTotal}</p>
        </div>
      </div>

      {/* Resedetaljer */}
      <div className="border-2 border-brunswickgreen p-4 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold">Your Journey</h3>
        <p>Check-in: {checkIn}</p>
        <p>Check-out: {checkOut}</p>
        <p>Guests: {guests}</p>
        {/* Lägg till AmenityList här om du har data */}
      </div>

      {/* Betalningsavsnitt */}
      <div className="space-y-4 border-t-2 pt-4">
        <h2 className="text-xl font-semibold">Credit Card Details</h2>
        <input
          type="text"
          placeholder="Card Number"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Name on Card"
          className="p-2 border rounded w-full"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="p-2 border rounded w-1/2"
          />
          <input
            type="text"
            placeholder="CVV"
            className="p-2 border rounded w-1/2"
          />
        </div>
      </div>

      <button className="w-full bg-brunswickgreen text-white py-2 rounded-lg font-bold text-lg">
        Pay Now
      </button>
    </div>
  );
};

export default ConfirmPay;
