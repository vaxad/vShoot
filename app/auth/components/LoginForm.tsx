"use client";
import React, { useState } from "react";
import store from "@/lib/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { setErr, setErrText } = store();
  const [data, setdata] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setdata({ ...data, [e.target.id]: e.target.value });
    setErr(false);
  };

  const { setUser } = store();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(data);
    console.log(values);
    if (values.includes("")) {
      setErrText("Please enter all fields");
      setErr(true);
    } else {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resJson = await resp.json();
      localStorage.setItem("auth-token", resJson.token);
      if (resJson.error) {
        setErrText("Incorrect credentials");
        setErr(true);
      } else {
        setUser(resJson.user as UserNull);
        router.push("/home");
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
        <label className=" px-4">Email</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.email}
          id="email"
          type="email"
          className=" w-full rounded-full text-black px-5 py-3"
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </motion.div>
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.5, delay:0.5 }} className="flex flex-col gap-2 w-11/12">
        <label className=" px-4">Password</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.password}
          id="password"
          type="password"
          className=" w-full rounded-full text-black px-5 py-3"
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </motion.div>
      <motion.button initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:1 }}
        type="submit"
        className=" text-slate-950 text-xl font-bold bg-slate-50 py-3 px-12 rounded-full hover:bg-slate-200 transition-all"
      >
        Login
      </motion.button>
      <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:1.5 }}>
      <Link
        className=" my-6 hover:scale-110 transition-all text-lg"
        href={"/auth/signup"}
      >
        Don&apos;t have an account?{" "}
        <span className=" text-violet-500">Sign up instead</span>
      </Link>
      </motion.div>
    </form>
  );
}
