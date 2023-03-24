import { useState } from "react";
import AlertModal from "../../component/AlertModal";

const initialState = { open: false, message: "", handler: () => {} };

const useModalState = (title) => {
  const [modal, setOpen] = useState(initialState);

  const openModal = (
    message,
    handler = () => {
      setOpen(initialState);
    }
  ) =>
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
