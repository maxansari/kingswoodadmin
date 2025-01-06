"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { auth } from "../../lib/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation.js";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign in a user
  async function signIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User signed in: ", userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  }

  return (
    <div className="">
      <div className="text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
      </div>

      <div className="flex w-[80%] mx-auto mt-4">
        <div className="mt-10">
          <h2>Login Into Your Account</h2>
          <form className="mt-4">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Email"}
              type={"email"}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              classNameContainer="mt-4"
              placeholder={"Password"}
              type={"password"}
            />
            <Button
              variant="contained"
              className="mt-4 w-full flex justify-center"
              onClick={(e) => {
                e.preventDefault();
                console.log("Email: ", email);
                signIn();
              }}
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-center">
            Forget Password? <a href="#">Reset Password</a>
          </p>
          <p className="mt-4 text-center">
            Need help? <a href="#">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
