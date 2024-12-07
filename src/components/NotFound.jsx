import React from "react";
import NotFoundIcon from "./../icons/NotFoundIcon";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container grid mx-auto max-w-[1366px] items-center text-center justify-center m-2 p-4">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="text-xl">It looks like this page can’t be found!</p>
      <NotFoundIcon />
      <Link to="/">
        <button className="mt-4 bg-simon hover:bg-dark-simon text-white font-bold py-2 px-4 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
