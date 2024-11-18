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
  Car,
  Beef,
} from "lucide-react";

// Define an icon map to match amenities to icons
const icons = {
  wifi: <Wifi />,
  "wi-fi": <Wifi />,
  "no wifi": <WifiOff />,
  tv: <Tv />,
  BBQ: <Beef />,
  bbq: <Beef />,
  parking: <Car />,
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
  coffe: <Coffee />,
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
        const amenityKey = amenity.trim().toLowerCase();
        return (
          <li
            key={index}
            className="flex items-center justify-center flex-col  h-24 space-y-1 group"
          >
            <div className="flex items-center justify-center h-8 transform transition-transform duration-300 group-hover:scale-150">
              {icons[amenityKey] ? (
                <span className="text-brunswickgreen">{icons[amenityKey]}</span>
              ) : null}
            </div>
            <span className="text-center text-sm text-brunswickgreen font-livvic">
              {amenity}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default AmenityList;
