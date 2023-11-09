import { Metadata } from "next";
import React from "react";
import VerifyForm from "../components/VerifyForm";

export const metadata: Metadata = {
  title: "Verify - vShoot",
  description: "Home for creative minds",
};
export default function Page() {
  return (
    <div className=" p-24 flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-2xl font-bold text-center">Verify your Email</h1>
      <VerifyForm />
    </div>
  );
}
