import React from "react";

function LoadingButton({ isLoading, text, onClick }) {
  return (
    <button
      className="w-full mt-6 items-center justify-center text-center flex font-bold bg-simon
       bg-primary text-white py-2 px-4 rounded-full hover:bg-dark-simon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        text
      )}
    </button>
  );
}

export default LoadingButton;
