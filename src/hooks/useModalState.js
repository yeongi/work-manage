import { useState } from "react";
import AlertModal from "../component/modal/AlertModal";

const initialState = {
  open: false,
  message: "",
  okHandler: () => {},
  cancelHandler: () => {},
};

const useModalState = (title) => {
  const [state, setIsOpen] = useState(initialState);

  const openModal = ({
    message,
    okHandler = () => {},
    closeHandler = () => {},
  }) =>
    setIsOpen({
      open: true,
      message,
      okHandler,
      closeHandler,
    });

  const closeModal = () => {
    setIsOpen((prev) => {
      return { ...prev, open: false };
    });
  };

  return {
    ModalElement: () => (
      <AlertModal
        title={title}
        isOepn={state.open}
        message={state.message}
        setCloseModal={closeModal}
        handleOpen={state.okHandler}
        handleClose={state.cancelHandler}
      />
    ),
    openModalWithSetting: openModal,
  };
};

export default useModalState;
