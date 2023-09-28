import { Metadata } from "next";
import React from "react";
import Posts from "./components/Posts";

export const metadata: Metadata = {
  title: "Connect - vShoot",
  description: "Home for creative minds",
};
export default function Page() {
  return (
    <div className="px-24 py-12 flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-2xl font-bold text-center">Connect Page</h1>
      <Posts />
    </div>
  );
}
