import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showPassword,
  toggleVisibility,
}) {
  return (
    <div className="mb-3">
      <h2 className="text-md text-grayDarker font-semibold">{label}</h2>
      <div className="mt-1 relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="********"
        />
        <span
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
          onClick={toggleVisibility}
        >
          {showPassword ? (
            <EyeSlashIcon className="size-6" />
          ) : (
            <EyeIcon className="size-6" />
          )}
        </span>
      </div>
      {touched && error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
}

export default PasswordInput;
