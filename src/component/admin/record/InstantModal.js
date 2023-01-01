import React, { useEffect, useState } from "react";
import { Modal } from "antd";
const InstantModal = ({ title, children, YearMonth }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //"YYYY-MM"
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])$/);
    if (regex.test(YearMonth)) setOpen(true);
  }, [YearMonth]);

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
export default InstantModal;
