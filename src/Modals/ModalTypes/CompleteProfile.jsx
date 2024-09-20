import React from "react";

const CompleteProfile = ({ closeModal }) => {
  return (
    <div
      className='flex flex-col  max-w-4xl py-3 px-5'
    >
      <div className="flex justify-end items-end text-right w-6">
        <img
          className="border-[1px] border-grayDarker p-1 my-2 rounded-full cursor-pointer"
          src="/home/x-close.svg"
          alt="close modal"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default CompleteProfile;