import React from "react";

function DialogHeader({ onClose }) {
  return (
    <div className="flex justify-end items-end text-right w-6">
      <img
        className="border-[1px] border-grayDarker p-1 my-2 rounded-full cursor-pointer"
        src="/home/x-close.svg"
        alt="Close"
        onClick={onClose}
      />
    </div>
  );
}

export default DialogHeader;
