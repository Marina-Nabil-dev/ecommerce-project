import React from "react";

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touched,
  backendError,
  placeholder,
  additionalContent = null,
}) {
  return (
    <div className="mb-3">
      <h2 className="text-md text-gray font-semibold">{label}</h2>
      <div className="mt-1 flex border-[1px] border-gray-300 rounded-md group focus-within:border-black">
        {additionalContent}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-2 py-2 border-none rounded-r-md focus:outline-none focus:ring-0 group-focus-within:border-black group-focus-within:border-[1px] group-focus-within:rounded-md"
          placeholder={placeholder}
        />
      </div>
      {(touched || error) && (
        <p className="text-red-500 font-semibold">{error}</p>
      )}
      {backendError && (
        <p className="text-red-500 font-semibold">{backendError}</p>
      )}
    </div>
  );
}

export default FormField;
