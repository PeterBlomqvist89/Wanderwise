import { Star } from "lucide-react";

export default function ListingCard({ listing, variant, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-timberwolf shadow-md rounded-lg overflow-hidden ${
        variant === "wide" ? "col-span-2 max-w-full" : "md:max-w-[300px]"
      } w-full ${onClick ? "cursor-pointer" : ""}`} // Lägg till cursor-pointer om onClick finns
    >
      <img
        src={listing.images[0]?.url}
        alt={listing.images[0]?.description || "Listing Image"}
        className="w-full h-48 md:h-48 object-cover"
      />
      <div className="h-10 flex flex-col pl-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-black">${listing.price} per night</p>
          <div className="flex items-center">
            <Star
              className="pt-1 mr-1"
              size={20}
              fill="#588157"
              color="var(--brunswickgreen)"
            />
            <p className="text-sm font-medium text-black pr-2">
              {listing.rating} ({listing.reviews ? listing.reviews.length : 0}{" "}
              reviews)
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold text-black">
          {listing.location.address}
        </p>
      </div>
    </div>
  );
}
