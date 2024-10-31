// components/ListingCard.js
import { Star } from "lucide-react";

export default function ListingCard({ listing, variant }) {
  return (
    <div
      className={`relative bg-white shadow-md rounded-lg overflow-hidden ${
        variant === "wide" ? "col-span-2  max-w-full" : "max-w-[300px]"
      }`}
    >
      <img
        src={listing.images[0]?.url}
        alt={listing.images[0]?.description || "Listing Image"}
        className="w-full h-48 md:h-60 object-cover"
      />
      <div className="p-4">
        <p className="text-xl font-bold">${listing.price} per night</p>
        <p className="text-gray-600">{listing.location.address}</p>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-500 mr-1" />
          <p>
            {listing.rating} ({listing.reviews ? listing.reviews.length : 0}{" "}
            reviews)
          </p>
        </div>
      </div>
    </div>
  );
}
