import {  useState } from "react";
import ErrorComponent from "../components/ErrorComponent";

export default function Spinner() {
  const [countdown, setCountdown] = useState(5);



    setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      return <ErrorComponent/>
    }

  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-baby-purple"></div>
    </div>
  );
}
