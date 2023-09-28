import { Metadata } from "next";
import React from "react";
import SignupForm from "../components/SignupForm";

export const metadata: Metadata = {
  title: "Signup - vShoot",
  description: "Home for creative minds",
};
export default function Page() {
  return (
    <div className="px-24 py-12 flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-2xl font-bold text-center">Sign up to vShoot</h1>
      <SignupForm />
    </div>
  );
}
