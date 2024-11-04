"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthContextProvider";
import { Settings } from "lucide-react";

const Profile = () => {
  const { user, authLoaded, updateUserProfile } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (authLoaded && !user) {
      router.push("/auth/sign-in");
    } else if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({
            name: docSnap.data().name || "",
            bio: docSnap.data().bio || "",
            location: docSnap.data().location || "",
            email: docSnap.data().email || "",
            phone: docSnap.data().phone || "",
            avatar: docSnap.data().avatar || "",
          });
        } else {
          setUserData({ ...userData, email: user.email || "" });
        }
      };
      fetchUserData();
    }
  }, [user, authLoaded, router]);

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserData({ ...userData, avatar: URL.createObjectURL(file) });

      try {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, file);
        const avatarURL = await getDownloadURL(avatarRef);

        await setDoc(
          doc(db, "users", user.uid),
          { avatar: avatarURL },
          { merge: true }
        );

        await updateUserProfile({ photoURL: avatarURL });

        toast.success("Avatar updated successfully!");
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast.error("Failed to update avatar. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
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

  const avatarUrl = user?.photoURL;

  return (
    <div className="flex flex-col items-center p-8 min-h-screen pb-32">
      <h1 className="text-6xl font-bold mb-6 text-brunswickgreen">
        Hello {displayName}
      </h1>

      <div className="relative w-[249px] h-[249px] ">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-brunswickgreen drop-shadow-xl">
          <img
            src={userData.avatar || avatarUrl || "/images/default-avatar.jpg"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="absolute bottom-0 -right-6 cursor-pointer">
          <Settings
            size={50}
            color="var(--brunswickgreen)"
            className="hover:animate-spin"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-12 bg-brunswickgreen p-6 rounded-lg w-full max-w-[720px] text-white space-y-4">
        {isEditing ? (
          <>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full mt-1 p-2 rounded text-black"
              />
            </div>
            <div>
              <label>Bio:</label>
              <input
                type="text"
                value={userData.bio || ""}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                className="w-full mt-1 p-2 rounded text-black"
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={userData.location || ""}
                onChange={(e) =>
                  setUserData({ ...userData, location: e.target.value })
                }
                className="w-full mt-1 p-2 rounded text-black"
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full mt-1 p-2 rounded text-black"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="font-bold">Name:</p>
              <p className="text-right">{userData.name || "Your Name"}</p>
            </div>

            <div
              className={`border-b border-gray-300 py-2 ${
                userData.bio
                  ? "flex flex-col items-start"
                  : "flex justify-between items-center"
              }`}
            >
              <p className="font-bold">Bio:</p>
              {userData.bio ? (
                <p className="w-full text-left mt-2">{userData.bio}</p>
              ) : (
                <p className="text-right">About you</p>
              )}
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="font-bold">Location:</p>
              <p className="text-right">
                {userData.location || "Where you from"}
              </p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="font-bold">Email:</p>
              <p className="text-right">{userData.email || "your email"}</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="font-bold">Phone:</p>
              <p className="text-right">{userData.phone || "number"}</p>
            </div>
          </>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-xl text-brunswickgreen font-medium px-8 py-2 bg-timberwolf border-2 border-timberwolf rounded-full hover:bg-brunswickgreen hover:text-timberwolf hover:border-timberwolf mt-2"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xl text-brunswickgreen font-medium px-8 py-2 bg-timberwolf border-2 border-timberwolf rounded-full hover:bg-brunswickgreen hover:text-timberwolf hover:border-timberwolf mt-2"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
