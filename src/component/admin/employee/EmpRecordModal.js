import React, { useEffect, useState } from "react";
import { Modal } from "antd";
const EmpRecordModal = ({ title, children, EMP_NO }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (EMP_NO) setOpen(true);
  }, [EMP_NO]);

  return (
    <>
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {children}
      </Modal>
    </>
  );
};
export default EmpRecordModal;
