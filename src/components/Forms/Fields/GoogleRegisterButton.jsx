import React from "react";

function GoogleRegisterButton() {
  return (
    <button className="w-full mt-4 flex justify-center items-center bg-white text-gray-700 py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100">
      <img src="/home/google.svg" alt="Google Logo" className="h-6 pr-2" />
      Register with Google
    </button>
  );
}

export default GoogleRegisterButton;
