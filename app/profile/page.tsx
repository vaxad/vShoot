import { Metadata } from "next";
import React from "react";
import Posts from "./components/Posts";
import LogoutBtn from "../auth/components/LogoutBtn";

export const metadata: Metadata = {
  title: "Profile - vShoot",
  description: "Home for creative minds",
};
export default function Page() {
  return (
    <div className="px-24 py-12 flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-2xl font-bold text-center">Profile Page</h1>
      <Posts />
      <LogoutBtn />
    </div>
  );
}
