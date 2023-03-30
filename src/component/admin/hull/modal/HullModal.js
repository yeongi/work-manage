import React, { useEffect, useState } from "react";
import { Modal } from "antd";
const HullModal = ({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD, complete }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //hull 정보가 맞으면
    setOpen(true);
  }, [HULL_SQ]);

  return (
    <>
      <Modal
        title="선체 정보 조회 및 수정"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
      >
        <h1>{HULL_TYPE}</h1>
      </Modal>
    </>
  );
};
export default HullModal;
