"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { toast } from "react-hot-toast";

const UserMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Lyssna på användarens inloggningsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsOpen(false); // Stänger menyn vid statusändring (inloggning/utloggning)
    });
    return () => unsubscribe();
  }, []);

  // Logga ut funktion
  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false); // Stäng menyn efter utloggning
    toast.success("Successfully signed out!"); // Visa toast vid utloggning
    router.push("/");
  };

  return (
    <div className="relative">
      <div onClick={toggleOpen} className="cursor-pointer">
        <Avatar />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[20vh] bg-timberwolf border border-gray-300 rounded-lg shadow-lg z-50">
          {isLoggedIn ? (
            // Visa Profile och Log out om användaren är inloggad
            <>
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                  setIsOpen(false);
                }}
                label="Profile"
              />
              <MenuItem onClick={handleLogout} label="Log out" />
            </>
          ) : (
            // Visa Sign In och Sign Up om användaren inte är inloggad
            <>
              <MenuItem
                onClick={() => {
                  router.push("/auth/sign-in");
                  setIsOpen(false);
                }}
                label="Sign In"
              />
              <MenuItem
                onClick={() => {
                  router.push("/auth/sign-up");
                  setIsOpen(false);
                }}
                label="Sign Up"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
