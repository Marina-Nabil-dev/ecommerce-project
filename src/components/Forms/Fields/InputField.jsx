import React from "react";

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) {
  return (
    <div className="mb-3">
      <h2 className="text-md text-grayDarker font-semibold">{label}</h2>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
        />
      </div>
      {touched && error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;
