import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import RegisterModal from "./ModalTypes/RegisterModal";
import LoginModal from "./ModalTypes/LoginModal";

const ModalComponent = ({
  isOpen,
  closeModal,
  modalType,
  modalProps,
  showImage,
}) => {
  const MODAL_COMPONENTS = {
    login: LoginModal,
    register: RegisterModal,
    // Add more modal components here as needed
  };
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      showImage={showImage}
      className="fixed inset-0 z-50 flex items-center justify-center w-full"
    >
      <DialogBackdrop className="fixed inset-0 bg-grayDarker bg-opacity-70 backdrop-blur-[2px]" />
      <DialogPanel
        className={`relative bg-white rounded-lg shadow-xl ${
          showImage ? "w-full p-0" : "w-[70%] p-2"
        } max-w-4xl flex overflow-hidden`}
      >
        {SpecificModal ? (
          <SpecificModal
            {...modalProps}
            closeModal={closeModal}
            showImage={showImage}
          />
        ) : null}
      </DialogPanel>
    </Dialog>
  );
};

export default ModalComponent;
