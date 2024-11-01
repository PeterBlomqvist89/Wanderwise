"use client";

import { useState, useRef } from "react";
import { db, storage } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import CategoryModal from "../components/CategoryModal";
import { useAuth } from "../components/AuthContextProvider";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { House, ImageUp } from "lucide-react";
import { useRouter } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is a barn!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
  {
    label: "Cabin",
    icon: House,
    description: "This property is a cabin!",
  },
];

const AddListingPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [listingData, setListingData] = useState({
    title: "",
    price: 0,
    rating: 0,
    description: "",
    cleaning_fee: 0,
    wanderwise_fee: 0,
    amenities: "",
    address: "",
    latitude: 0,
    longitude: 0,
    cancellation_policy: "",
    max_guests: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `listings/${image.name}`);
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          return { url, description: image.name };
        })
      );

      const listing = {
        ...listingData,
        images: uploadedImages,
        amenities: listingData.amenities.split(","),
        location: {
          address: listingData.address,
          latitude: parseFloat(listingData.latitude),
          longitude: parseFloat(listingData.longitude),
        },
        owner: [
          {
            name: user?.displayName || "N/A",
            contact: user?.email || "N/A",
          },
        ],
        property_type: selectedCategory
          ? {
              label: selectedCategory.label,
              description: selectedCategory.description,
            }
          : null,
      };

      await addDoc(collection(db, "listings"), listing);
      toast.success("Listing added successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Failed to add listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-6xl font-bold mb-6 text-brunswickgreen flex text-center">
        Add Your Own Wandercabin
      </h2>
      <div className="mt-12 md:mb-12 mb-24 bg-brunswickgreen p-6 rounded-lg w-full max-w-[720px] text-white space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="font-bold mt-2">Property Name:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter a name for your property"
            value={listingData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />

          <label className="font-bold mt-2">Price per Night ($):</label>
          <input
            type="number"
            name="price"
            placeholder="Set your nightly rate"
            value={listingData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />

          <label className="font-bold mt-2">Maximum Guests:</label>
          <input
            type="number"
            name="max_guests"
            placeholder="Enter max number of guests"
            value={listingData.max_guests}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />

          <label className="font-bold mt-2">Property Type:</label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full p-2 bg-gray-100 rounded text-brunswickgreen border-2 font-semibold hover:bg-brunswickgreen hover:text-white hover:border-2 hover:border-timberwolf "
          >
            {selectedCategory ? selectedCategory.label : "Choose a category"}
          </button>

          <label className="font-bold mt-2">Property Description:</label>
          <textarea
            name="description"
            placeholder="Describe your property"
            value={listingData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          ></textarea>

          <label className="font-bold mt-2">Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter property address"
            value={listingData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />

          <label className="font-bold mt-2">Amenities (comma separated):</label>
          <input
            type="text"
            name="amenities"
            placeholder="WiFi, Air Conditioning, etc."
            value={listingData.amenities}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <div className="flex gap-2 ">
            <label className="font-bold mt-2 mb-4">Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <ImageUp
              onClick={handleBrowseClick}
              size={40}
              className="hover:scale-125 cursor-pointer"
            />
          </div>

          <div className="flex justify-center ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-xl text-brunswickgreen font-medium px-8 py-2 bg-timberwolf border-2 border-timberwolf rounded-full hover:bg-brunswickgreen hover:text-timberwolf hover:border-timberwolf"
            >
              {isSubmitting ? "Submitting..." : "Add Listing"}
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <CategoryModal
          title="Choose a Category"
          categories={categories}
          onSelectCategory={(category) => setSelectedCategory(category)}
          onClose={() => setIsModalOpen(false)}
          buttonText="Done"
          gridColumns="grid-cols-4"
          customStyles={{
            overlay: "bg-opacity-70",
            container: "p-8",
            button: "brunswickgreen hover:ferngreen",
          }}
        />
      )}
    </div>
  );
};

export default AddListingPage;
