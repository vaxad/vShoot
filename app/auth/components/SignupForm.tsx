"use client";
import React, { useState } from "react";
import genderdb from "../../../public/genders.json";
import db from "../../../public/data.json";
import professiondb from "../../../public/professions.json";
import store from "@/lib/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function SignupForm() {
  const { setErr, setErrText } = store();
  const {data : session} = useSession()
  const [stage, setStage] = useState(1)
  const [data, setdata] = useState({
    name: "",
    email: session?.user?.email as string,
    password: "none",
    dob: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    profession: "",
    role:""
  });
  const locations = db as location[];
  const genders = genderdb as String[];
  const professions = professiondb as String[];
  const roles = ["Creator", "Viewer"] as String[];
  const router = useRouter();

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setdata({ ...data, [e.target.id]: e.target.value });
    setErr(false);
  };

  const handleNext = () => {
    switch(stage){
      case 1:
        if(data.name===""){
          alert("Please enter your name")
          return
        }
        break
      case 2:
        if(data.name===""){
          alert("Please enter your date of birth")
          return
        }
        break
      case 3:
        if(data.country===""){
          alert("Please enter your country")
          return
        }
        break
      case 4:
        if(data.profession===""){
          alert("Please enter your profession")
          return
        }
        break
      case 5:
        if(data.role===""){
          alert("Please enter your role")
          return
        }
        break
      
    }
    setStage(stage+1)
  }

  const { setUser, user } = store();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      // localStorage.setItem("auth-token", resJson.token);
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
      className="{` flex flex-col gap-6 justify-center items-center w-full"
    >
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0 }} className={`${stage!==1&&"hidden "}flex flex-col gap-2 w-11/12`}>
        <label className="{` px-4`}">Name</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.name}
          id="name"
          type="text"
          className={`w-full rounded-full text-black px-5 py-3`} 
          placeholder="Bjarne Stroustrup"
        ></input>
      </motion.div>
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.3 }} className={`${stage!=-1&&" hidden"} flex flex-col gap-2 w-11/12`}>
        <label className="{` px-4`}">Email</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.email}
          id="email"
          type="email"
          className="{` w-full rounded-full text-black px-5 py-3"
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </motion.div>
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.6 }} className={`${stage!=-1&&" hidden"} flex flex-col gap-2 w-11/12`}>
        <label className={` px-4`}>Password</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.password}
          id="password"
          type="password"
          className="{` w-full rounded-full text-black px-5 py-3"
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </motion.div>
      <motion.div initial={{ opacity: 0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.9 }} className={`${stage!=2&&" hidden"} flex flex-col gap-2 w-11/12 text-slate-100`}>
        <label className={` px-4`}>Date of Birth</label>
        <input
          required
          onChange={(e) => {
            handleChange(e);
          }}
          value={data.dob}
          id="dob"
          type="date"
          className={` w-full rounded-full text-black px-5 py-3`}
          placeholder="bjarnestroustrup@orkut.com"
        ></input>
      </motion.div>
      <div className={`${stage!=3&&" hidden"} flex flex-row gap-2 w-11/12`}>
        <motion.div initial={{ opacity:0, y:50 }}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.2 }} className={`flex flex-col gap-2 w-1/3`}>
          <label className="{` px-4`}">Country</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="country"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
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
        </motion.div>
        <motion.div initial={{ opacity:0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.5}} className={`flex flex-col gap-2 w-1/3`}>
          <label className={` px-4`}>State</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="state"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
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
        </motion.div>
        <motion.div initial={{ opacity:0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.8 }} className={`flex flex-col gap-2 w-1/3`}>
          <label className={` px-4`}>City</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="city"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
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
        </motion.div>
      </div>
      <div className={`${stage!=4&&" hidden"} flex flex-row gap-2 w-11/12`}>
        <motion.div initial={{ opacity:0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:2.1 }} className={`flex flex-col gap-2 w-1/2`}>
          <label className="{` px-4`}">Gender</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="gender"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
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
        </motion.div>
        <motion.div initial={{ opacity:0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:2.4 }} className={`flex flex-col gap-2 w-1/2`}>
          <label className="{` px-4`}">Profession</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="profession"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
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
        </motion.div>
      </div>
      
      <div className={`${stage!=5&&" hidden"} flex flex-row gap-2 w-11/12`}>
      <motion.div initial={{ opacity:0, y:50}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:2.4 }} className={`flex flex-col gap-2 w-full`}>
          <label className="{` px-4`}">Role</label>
          <select
            required
            onChange={(e) => {
              handleChange(e);
            }}
            id="role"
            className={` appearance-none px-5 py-3 w-full flex justify-between text-black rounded-full placeholder:w-fit `}
          >
            <option value={""} selected>
              Choose a Role
            </option>
            {roles.map((role) => {
              return (
                <option
                  key={role as React.Key}
                  value={role as string}
                >
                  {role}
                </option>
              );
            })}
          </select>
        </motion.div>
        </div>
      <motion.button initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:2.7 }}
        type={`${"button"}`} onClick={(e)=>{stage<5?handleNext():handleSubmit(e)}}
        className={` text-slate-950 text-xl font-bold bg-slate-50 py-3 px-12 rounded-full hover:bg-slate-200 transition-all`}
      >
        {`${stage===5?"Create Account":"Next"}`}
      </motion.button>
      <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 0.5, delay:3 }} className="{` flex`}">
      <Link
        className="{` my-6 hover:scale-110 transition-all text-lg"
        href={"/auth/login"}
      >
        Already have an account?{" "}
        <span className="{` text-violet-500`}">Login instead</span>
      </Link>
      </motion.div>
    </form>
  );
}
