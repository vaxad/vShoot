"use client";
import React, { useState } from "react";
import store from "@/lib/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

export default function VerifyForm() {
  const { setErr, setErrText } = store();
  const {data:session} = useSession()
  const [data, setdata] = useState({ otp: "" });
  const router = useRouter();

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setdata({ ...data, [e.target.id]: e.target.value });
    setErr(false);
  };

//   const { setUser } = store();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(data);
    console.log(values);
    if (values.includes("")) {
      setErrText("Please enter all fields");
      setErr(true);
    } else {
      const resp = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({otp:parseInt(data.otp), email:session?.user?.email}),
      });

      const resJson = await resp.json();
      if (resJson.verified) {
        router.push("/auth");
      } else {
        setErrText("Incorrect otp");
        setErr(true);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className=" flex flex-col gap-6 justify-center items-center w-full"
    >
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.5 }}  className="flex flex-col gap-2 w-11/12">
        <label className=" px-4">Otp sent to {session?.user?.email}</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.otp}
          id="otp"
          type="number"
          className=" w-full rounded-full text-black px-5 py-3"
          placeholder="335323"
        ></input>
      </motion.div>
      <motion.button initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:1 }}
        type="submit"
        className=" text-slate-950 text-xl font-bold bg-slate-50 py-3 px-12 rounded-full hover:bg-slate-200 transition-all"
      >
        Verify
      </motion.button>
      <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:1.5 }}>
      <button
        className=" my-6 hover:scale-110 transition-all text-lg"
        onClick={() => {signIn()}}
      >
        Not your email?{" "}
        <span className=" text-violet-500">Sign in with your email</span>
      </button>
      </motion.div>
    </form>
  );
}
