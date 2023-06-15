import { Modal } from "antd";

const AlertModal = ({ title, state, setIsModalOpen }) => {
  const handleOk = () => {
    state.handler();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {state.open && (
        <Modal
          title={title}
          open={state.open}
          closable={true}
          onOk={handleOk}
          onCancel={handleCancel}
          type="success"
        >
          <p>{state.message}</p>
        </Modal>
      )}
    </>
  );
};

export default AlertModal;
