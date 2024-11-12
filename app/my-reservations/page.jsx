"use client";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

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
        const q = query(
          collection(db, "listings"),
          where("bookings.user", "==", currentUser)
        );

        const querySnapshot = await getDocs(q);
        const userReservations = [];
        querySnapshot.forEach((doc) => {
          userReservations.push({ id: doc.id, ...doc.data() });
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
        prev.filter((res) => res.id !== listingId || index !== bookingIndex)
      );
    } catch (error) {
      toast.error("Failed to delete reservation. Please try again.");
      console.error("Delete reservation error:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">My Reservations</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation, idx) => (
          <div key={reservation.id} className="border p-4 mb-4 rounded shadow">
            <p>Address: {reservation.address}</p>
            <p>Check-in: {reservation.bookings[idx].checkIn}</p>
            <p>Check-out: {reservation.bookings[idx].checkOut}</p>
            <button
              onClick={() => handleDeleteReservation(reservation.id, idx)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Cancel Reservation
            </button>
          </div>
        ))
      ) : (
        <p>You have no reservations.</p>
      )}
    </div>
  );
};

export default MyReservations;
