"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";

const FormInputSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed in!"); // Visa toast vid lyckad inloggning
      router.push("/"); // Omdirigera till startsidan efter inloggning
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in. Please check your credentials.");
      toast.error("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 bg-brunswickgreen p-8 text-timberwolf w-[476px] md:m-0 m-8 md:rounded-none rounded-xl ">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>

      <form onSubmit={handleSignIn} className="space-y-4 w-full max-w-[476px]">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-xl font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded-2xl bg-timberwolf text-gray-900 h-9"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 rounded-2xl bg-timberwolf text-gray-900 h-9"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full text-xl text-timberwolf font-medium py-2 bg-ferngreen border-2 border-timberwolf rounded-full hover:bg-timberwolf hover:text-ferngreen hover:border-ferngreen"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className=" text-center text-lg mt-6">
        Not a member? Create an account{" "}
        <span
          onClick={() => router.push("/auth/sign-up")}
          className="underline cursor-pointer text-white"
        >
          here
        </span>
      </p>
    </div>
  );
};

export default FormInputSignIn;
