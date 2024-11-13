"use client";

import { useState, useRef, useEffect } from "react";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import CategoryModal from "../components/CategoryModal";
import { useAuth } from "../components/AuthContextProvider";

import { CircleX, ImageUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { categories } from "../components/Categories";

const AddListingPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [listingData, setListingData] = useState({
    title: "",
    price: 0,
    rating: 0,
    description: "",
    cleaning_fee: 50,
    wanderwise_fee: 20,
    amenities: "",
    address: "",
    latitude: 0,
    longitude: 0,
    cancellation_policy:
      "Cancel up to 24 hours before your stay for a full refund. Cancellations made less than 24 hours before the stay will incur a 50% charge.",
    max_guests: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
    }
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

      // Hämta användarens fullständiga profil från Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

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
            name: userData.name || "N/A",
            contact: user?.email || "N/A",
            avatar: userData.avatar || "/images/default-avatar.jpg",
            phone: userData.phone || "N/A", // Säkerställ att telefonnumret kommer från användarens profil
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

  if (!user) {
    return (
      <p className="text-center text-red-500">
        You need to log in to access this page.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-6xl font-semibold mb-6 text-brunswickgreen flex text-center font-livvic">
        Add Your Own Wandercabin
      </h2>
      <div className="mt-12 md:mb-12 mb-24 bg-brunswickgreen p-6 rounded-lg w-full max-w-[720px] text-white space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="font-semibold mt-2 font-livvic">
            Property Name:
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter a name for your property"
            value={listingData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          />

          <label className="font-semibold mt-2 font-livvic">
            Price per Night ($):
          </label>
          <input
            type="number"
            name="price"
            placeholder="Set your nightly rate"
            value={listingData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          />

          <label className="font-semibold font-livvic mt-2">
            Maximum Guests:
          </label>
          <input
            type="number"
            name="max_guests"
            placeholder="Enter max number of guests"
            value={listingData.max_guests}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          />

          <label className="font-semibold font-livvic mt-2">
            Property Type:
          </label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full p-2 bg-gray-100 rounded text-brunswickgreen border-2 font-semibold hover:bg-brunswickgreen hover:text-white hover:border-2 hover:border-timberwolf "
          >
            {selectedCategory ? selectedCategory.label : "Choose a category"}
          </button>

          <label className="font-semibold font-livvic mt-2">
            Property Description:
          </label>
          <textarea
            name="description"
            placeholder="Describe your property"
            value={listingData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          ></textarea>

          <label className="font-semibold font-livvic mt-2">Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter property address"
            value={listingData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          />

          <label className="font-semibold font-livvic mt-2">
            Amenities (comma separated):
          </label>
          <input
            type="text"
            name="amenities"
            placeholder="WiFi, Air Conditioning, etc."
            value={listingData.amenities}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black font-livvic"
            required
          />
          <div className="flex gap-2 ">
            <label className="font-bold mt-2 mb-4 font-livvic">
              Upload (multiple) Images:
            </label>
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

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-full h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Listing Preview"
                    className="object-cover w-full h-full rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <CircleX size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

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
