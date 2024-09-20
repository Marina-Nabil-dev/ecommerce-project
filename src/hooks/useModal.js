import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeOpenModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  return {
    isModalOpen,
    modalType,
    openModal,
    closeOpenModal,
  };
};

export default useModal;
