"use client";
import store from "@/lib/zustand";
import React from "react";

export default function Toast() {
  const { err, setErr, errText, setErrText } = store();
  return (
    <div
      id="toast-default"
      className={`flex fixed  top-24 ${
        err ? " opacity-90" : " opacity-0"
      } items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow`}
      role="alert"
      style={{ transitionDelay: "200ms", transitionDuration: "600ms" }}
    >
      <div className="ml-3 text-sm font-normal">{errText}</div>
      <button
        onClick={() => {
          setErr(false);
        }}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
