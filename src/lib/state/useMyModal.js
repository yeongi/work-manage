import { useState } from "react";
import AlertModal from "../../component/AlertModal";

const useModalState = (title) => {
  const [modal, setOpen] = useState({ open: false, message: "" });

  const openModal = (message, handler) =>
    setOpen({
      open: true,
      message: message,
      handler,
    });

  return {
    MyModal: () => (
      <AlertModal title={title} state={modal} setIsModalOpen={setOpen} />
    ),
    openModalFunc: openModal,
  };
};

export default useModalState;
