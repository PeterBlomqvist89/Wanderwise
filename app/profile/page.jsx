"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthContextProvider";

const Profile = () => {
  const { user, authLoaded } = useAuth(); // Använd `useAuth` från AuthContextProvider
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const router = useRouter();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (authLoaded && !user) {
      // Om ingen användare är inloggad, omdirigera till inloggningssidan
      router.push("/auth/sign-in");
    } else if (user) {
      // Hämta användarens profilinformation från Firestore om användaren är inloggad
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({ ...userData, email: user.email || "" });
        }
      };
      fetchUserData();
    }
  }, [user, authLoaded, router]);

  // Hantera avatar-ändring
  const handleAvatarChange = (e) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  // Ladda upp ändringar till Firestore och Firebase Storage
  const handleSave = async () => {
    if (user) {
      try {
        if (newAvatar) {
          const avatarRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(avatarRef, newAvatar);
          const avatarURL = await getDownloadURL(avatarRef);
          userData.avatar = avatarURL;
          await updateProfile(user, { photoURL: avatarURL });
        }

        await setDoc(doc(db, "users", user.uid), userData, { merge: true });
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  const displayName = capitalizeFirstLetter(
    userData.name || user?.email?.split("@")[0] || "User"
  );

  if (!authLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-brunswickgreen">
        Hello {displayName}
      </h1>

      {/* Avatar och Ändra knapp */}
      <div className="flex items-center space-x-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={userData.avatar || "/images/default-avatar.jpg"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded-full">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Profilinformation */}
      <div className="mt-8 bg-ferngreen p-6 rounded-lg w-full max-w-md text-white space-y-4">
        {isEditing ? (
          <>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full mt-1 p-2 rounded"
              />
            </div>
            <div>
              <label>Bio:</label>
              <input
                type="text"
                value={userData.bio}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                className="w-full mt-1 p-2 rounded"
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={userData.location}
                onChange={(e) =>
                  setUserData({ ...userData, location: e.target.value })
                }
                className="w-full mt-1 p-2 rounded"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full mt-1 p-2 rounded"
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full mt-1 p-2 rounded"
              />
            </div>
          </>
        ) : (
          <>
            <p>Name: {userData.name || "Your Name"}</p>
            <p>Bio: {userData.bio || "About you"}</p>
            <p>Location: {userData.location || "Where you from"}</p>
            <p>Email: {userData.email || "your email"}</p>
            <p>Phone: {userData.phone || "number"}</p>
          </>
        )}
      </div>

      {/* Edit och Save Knapp */}
      <div className="flex space-x-4 mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-emerald-500 text-white px-4 py-2 rounded-full"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xl text-timberwolf font-medium px-8 py-2 bg-brunswickgreen border-2 border-timberwolf rounded-full hover:bg-timberwolf hover:text-brunswickgreen hover:border-brunswickgreen"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
