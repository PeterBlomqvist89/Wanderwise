"use client";

import { useState } from "react";
import { db, storage } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

const AddListingPage = () => {
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
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      };

      await addDoc(collection(db, "listings"), listing);
      toast.success("Listing added successfully!");
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Failed to add listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Add Your Own Wandercabin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={listingData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price per night"
          value={listingData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={listingData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={listingData.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={listingData.amenities}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isSubmitting ? "Submitting..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;
