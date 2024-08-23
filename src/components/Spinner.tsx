import React from "react";

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}
