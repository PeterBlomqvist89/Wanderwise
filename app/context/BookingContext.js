import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    id: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    price: 0,
    cleaningFee: 0,
    wanderwiseFee: 0,
    address: "",
    description: "",
    amenities: [],
    images: [],
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
