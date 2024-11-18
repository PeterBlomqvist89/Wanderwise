"use client";

import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Skapa contextet med rätt typ eller null som default
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      setAuthLoaded(true);
    });

    return () => unsub();
  }, []);

  const updateUserProfile = async (profileData) => {
    if (user) {
      try {
        await updateProfile(user, profileData);
        setUser({ ...user, ...profileData }); // Uppdaterar user-objektet i context
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  const register = async (values) => {
    const toastId = toast.loading("Creating account...");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (!userCredential.user) {
        throw new Error("Something went wrong, please try again later.");
      }
      console.log(userCredential);

      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`,
      });

      toast.success("Account created!", { id: toastId });
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
      const message = err.code.split("/")[1].replace(/-/g, " ");
      toast.error(message || err.message, { id: toastId });
    }
  };

  const fetchUserData = async (uid) => {
    // Anta att du hämtar data från Firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const login = async (values) => {
    const toastId = toast.loading("Signing in...");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (!userCredential.user) {
        throw new Error("Something went wrong, please try again later.");
      }

      // Hämta användardata om det finns
      const userData = await fetchUserData(userCredential.user.uid);

      toast.success("Signed in!", { id: toastId });
    } catch (err) {
      console.log(err.message);
      const message = err.code.split("/")[1].replace(/-/g, " ");
      toast.error(message || err.message, { id: toastId });
    }
  };

  const value = {
    user,
    authLoaded,
    register,
    login,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be inside an AuthContextProvider");

  return context;
};
