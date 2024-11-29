import React, { useEffect, useState } from "react";

function ErrorComponent({ error }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      window.location.reload();
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-red-500">
          {error || "Something went wrong while fetching the data."}
        </p>
        <p className="mt-4 text-gray-600">
          Reloading in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

export default ErrorComponent;
