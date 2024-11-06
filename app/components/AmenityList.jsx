// components/AmenityList.jsx
import React from "react";
import {
  Wifi,
  WifiOff,
  Tv,
  Bed,
  BedDouble,
  AirVent,
  Waves,
  Trees,
  ShowerHead,
  Dumbbell,
  CookingPot,
  WashingMachine,
  Coffee,
  PartyPopper,
  Snowflake,
  MountainSnow,
  PawPrint,
  Heater,
  FlameKindling,
  TreePalm,
  Flower2,
  Bike,
  Sunrise,
  Sunset,
  Beer,
  Sun,
  Bath,
  Caravan,
  TentTree,
} from "lucide-react";

// Define an icon map to match amenities to icons
const icons = {
  wifi: <Wifi />,
  "no wifi": <WifiOff />,
  tv: <Tv />,
  "air conditioning": <AirVent />,
  bedroom: <Bed />,
  "double bed": <BedDouble />,
  swimming: <Waves />,
  pool: <Waves />,
  nature: <Trees />,
  shower: <ShowerHead />,
  bath: <Bath />,
  gym: <Dumbbell />,
  kitchen: <CookingPot />,
  washer: <WashingMachine />,
  "coffe-maker": <Coffee />,
  party: <PartyPopper />,
  snow: <Snowflake />,
  mountains: <MountainSnow />,
  "pet-friendly": <PawPrint />,
  heater: <Heater />,
  fireplace: <FlameKindling />,
  beach: <TreePalm />,
  garden: <Flower2 />,
  "bike-rental": <Bike />,
  sunny: <Sun />,
  sunrise: <Sunrise />,
  sunset: <Sunset />,
  beer: <Beer />,
  caravan: <Caravan />,
  tent: <TentTree />,
  // Add more icons as needed
};

const AmenityList = ({ amenities }) => {
  return (
    <ul className="flex flex-wrap gap-4 list-none justify-center mx-auto">
      {amenities.map((amenity, index) => {
        const amenityKey = amenity.trim().toLowerCase(); // Standardize the amenity key
        return (
          <li
            key={index}
            className="flex items-center justify-center flex-col  h-24 space-y-1" // Fixed size for consistent layout
          >
            {/* Display the icon if it exists in the icons object */}
            <div className="flex items-center justify-center h-8">
              {icons[amenityKey] ? (
                <span className="text-brunswickgreen">{icons[amenityKey]}</span>
              ) : null}
            </div>
            <span className="text-center text-sm text-brunswickgreen">
              {amenity}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default AmenityList;
