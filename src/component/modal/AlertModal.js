import { Modal } from "antd";
import { useState } from "react";

const AlertModal = ({
  title,
  isOepn,
  setCloseModal,
  message,
  handleOpen = () => {},
  handleClose = () => {},
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleOpen();
    setConfirmLoading(false);
    setCloseModal();
  };

  const handleCancel = async () => {
    setConfirmLoading(true);
    await handleClose();
    setConfirmLoading(false);
    setCloseModal();
  };

  return (
    <>
      <Modal
        title={title}
        open={isOepn}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};

export default AlertModal;
