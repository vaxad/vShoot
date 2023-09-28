"use client";
import store from "@/lib/zustand";
import React from "react";

export default function Posts() {
  const { user } = store();
  return <div className=" text-4xl">Posts for {user?.name}</div>;
}
