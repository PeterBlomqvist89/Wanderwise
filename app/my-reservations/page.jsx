"use client";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      if (currentUser) {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const userReservations = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const userBookings = data.bookings?.filter(
            (booking) => booking.user === currentUser
          );

          if (userBookings && userBookings.length > 0) {
            userBookings.forEach((booking) => {
              userReservations.push({
                id: doc.id,
                address: data.address,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guests: booking.guests,
                image: data.images?.[0]?.url || "/images/default-image.jpg", // Använd den första bilden eller standardbild
              });
            });
          }
        });

        setReservations(userReservations);
      }
    };

    fetchReservations();
  }, [currentUser]);

  const handleDeleteReservation = async (listingId, bookingIndex) => {
    try {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const updatedBookings = data.bookings.filter(
        (_, index) => index !== bookingIndex
      );

      await updateDoc(docRef, { bookings: updatedBookings });
      toast.success("Reservation deleted.");

      setReservations((prev) =>
        prev.filter((res, idx) => res.id !== listingId || idx !== bookingIndex)
      );
    } catch (error) {
      toast.error("Failed to delete reservation. Please try again.");
      console.error("Delete reservation error:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4 font-livvic">
        My Reservations
      </h1>
      {reservations.length > 0 ? (
        reservations.map((reservation, idx) => (
          <div
            key={`${reservation.id}-${idx}`}
            className="border p-4 mb-4 rounded shadow flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-lg font-livvic">
                {reservation.address}
              </p>
              <p className="font-livvic">
                Check-in:{" "}
                {new Date(reservation.checkIn).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-livvic">
                Check-out:{" "}
                {new Date(reservation.checkOut).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-livvic">Guests: {reservation.guests}</p>
              <button
                onClick={() => handleDeleteReservation(reservation.id, idx)}
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Cancel Reservation
              </button>
            </div>
            <div className="ml-4">
              <img
                src={reservation.image}
                alt="Listing"
                className="w-32 h-32 object-cover rounded"
                onError={(e) => {
                  e.target.src = "/images/default-image.jpg";
                }} // Reservbild om laddning misslyckas
              />
            </div>
          </div>
        ))
      ) : (
        <p className="font-livvic">You have no reservations.</p>
      )}
    </div>
  );
};

export default MyReservations;
