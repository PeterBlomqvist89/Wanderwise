// uppdaterad UserMenu-komponent
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsOpen(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false); // Manuellt sätt isLoggedIn till false
    setIsOpen(false);
    toast.success("Successfully signed out!");

    // Fördröj omdirigering för att säkerställa att användaren loggas ut innan sidan byts
    setTimeout(() => {
      router.push("/");
    }, 10);
  };

  return (
    <div className="relative">
      <div onClick={toggleOpen} className="cursor-pointer">
        <Avatar />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[20vh] bg-timberwolf border border-gray-300 rounded-lg shadow-lg z-50">
          {isLoggedIn ? (
            <>
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                  setIsOpen(false);
                }}
                label="Profile"
              />
              <MenuItem
                onClick={() => {
                  router.push("/add-listing");
                  setIsOpen(false);
                }}
                label="Add your own wandercabin"
              />
              <MenuItem onClick={handleLogout} label="Log out" />
            </>
          ) : (
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
