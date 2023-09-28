import { Metadata } from "next";
import React from "react";
import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "Login - vShoot",
  description: "Home for creative minds",
};
export default function Page() {
  return (
    <div className=" p-24 flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-2xl font-bold text-center">Login to vShoot</h1>
      <LoginForm />
    </div>
  );
}
