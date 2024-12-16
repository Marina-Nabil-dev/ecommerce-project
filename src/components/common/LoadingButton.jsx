import React from "react";
import Spinner from "../../icons/Spinner";

export const LoadingButton = ({
  isLoading,
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className="size-1" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
