import React from "react";
import { Spinner } from "./Spinner";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Spinner />
      </div>
    </div>
  );
}
