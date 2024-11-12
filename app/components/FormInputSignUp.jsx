import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig"; // Se till att db är importerat från firebaseConfig
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const FormInput = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Spara användaren i Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
      });

      toast.success("Successfully registered!");
      router.push("/");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 bg-brunswickgreen p-8 text-timberwolf w-[476px] md:m-0 m-8 md:rounded-none rounded-xl ">
      <h2 className="text-2xl font-bold mb-4 font-livvic">
        Please fill in the form
      </h2>
      <form
        onSubmit={handleRegister}
        className="space-y-4 w-full max-w-[476px]"
      >
        <div>
          <label
            className="block text-xl font-medium mb-2 font-livvic"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-2 rounded-2xl bg-timberwolf text-gray-900 h-9 font-livvic"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-xl font-medium mb-2 font-livvic"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded-2xl bg-timberwolf text-gray-900 h-9 font-livvic"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-xl font-medium mb-2 font-livvic"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 rounded-2xl bg-timberwolf text-gray-900 h-9 font-livvic"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="pt-6">
          <button
            type="submit"
            className="w-full text-xl text-timberwolf font-livvic font-medium py-2 bg-ferngreen border-2 border-timberwolf rounded-full hover:bg-timberwolf hover:text-ferngreen hover:border-ferngreen"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center text-lg mt-6 font-livvic">
        Already a member?{" "}
        <span
          onClick={() => router.push("/auth/sign-in")}
          className="underline cursor-pointer text-white font-livvic"
        >
          Sign in here
        </span>
      </p>
    </div>
  );
};

export default FormInput;
