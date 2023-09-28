"use client";
import React, { useState } from "react";
import genderdb from "../../../public/genders.json";
import db from "../../../public/data.json";
import professiondb from "../../../public/professions.json";
import store from "@/lib/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const { setErr, setErrText } = store();
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    profession: "",
  });
  const locations = db as location[];
  const genders = genderdb as String[];
  const professions = professiondb as String[];
  const router = useRouter();

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setdata({ ...data, [e.target.id]: e.target.value });
    setErr(false);
  };

  const { setUser, user } = store();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(data);
    console.log(values);
    if (values.includes("")) {
      setErrText("Please enter all fields");
      setErr(true);
    } else {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resJson = await resp.json();
      localStorage.setItem("auth-token", resJson.token);
      if (resJson.error) {
        setErrText("User with this email already exists");
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
      <div className="flex flex-col gap-2 w-11/12">
        <label className=" px-4">Name</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.name}
          id="name"
          type="text"
          className=" w-full rounded-full text-black px-5 py-3"
          placeholder="Bjarne Stroustrup"
        ></input>
      </div>
      <div className="flex flex-col gap-2 w-11/12">
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
      </div>
      <div className="flex flex-col gap-2 w-11/12">
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
      </div>
      <div className="flex flex-col gap-2 w-11/12 text-slate-100">
        <label className=" px-4">Date of Birth</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.dob}
          id="dob"
          type="date"
          className=" w-full rounded-full text-black px-5 py-3"
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </div>
      <div className="flex flex-row gap-2 w-11/12">
        <div className="flex flex-col gap-2 w-1/3">
          <label className=" px-4">Country</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="country"
            className=" appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit "
          >
            <option value={""} selected>
              Choose a Country
            </option>
            {locations.map((location: location) => {
              return (
                <option
                  key={location.name as React.Key}
                  value={location.name as string}
                >
                  {location.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <label className=" px-4">State</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="state"
            className=" appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit "
          >
            <option value={""} selected>
              Choose a State
            </option>
            {locations
              .find((el) => {
                return el.name === data.country;
              })
              ?.states.map((location) => {
                return (
                  <option
                    key={location.name as React.Key}
                    value={location.name as string}
                  >
                    {location.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <label className=" px-4">City</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="city"
            className=" appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit "
          >
            <option value={""} selected>
              Choose a City
            </option>
            {locations
              .find((el) => {
                return el.name === data.country;
              })
              ?.states.find((el) => {
                return el.name === data.state;
              })
              ?.cities.map((location) => {
                return (
                  <option
                    key={location.name as React.Key}
                    value={location.name as string}
                  >
                    {location.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-2 w-11/12">
        <div className="flex flex-col gap-2 w-1/2">
          <label className=" px-4">Gender</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="gender"
            className=" appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit "
          >
            <option value={""} selected>
              Choose a Gender
            </option>
            {genders.map((gender) => {
              return (
                <option key={gender as React.Key} value={gender as string}>
                  {gender}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className=" px-4">Profession</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="profession"
            className=" appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit "
          >
            <option value={""} selected>
              Choose a Profession
            </option>
            {professions.map((profession) => {
              return (
                <option
                  key={profession as React.Key}
                  value={profession as string}
                >
                  {profession}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className=" text-slate-950 text-xl font-bold bg-slate-50 py-3 px-12 rounded-full hover:bg-slate-200 transition-all"
      >
        Sign up
      </button>
      <Link
        className=" my-6 hover:scale-110 transition-all text-lg"
        href={"/auth/login"}
      >
        Already have an account?{" "}
        <span className=" text-violet-500">Login instead</span>
      </Link>
    </form>
  );
}
