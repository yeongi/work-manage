import React, { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import useModalState from "../../../../lib/state/useMyModal";
import classes from "./HullModal.module.css";
import { Modal, Button } from "antd";

const HullModal = ({ hullInfo, resetHullState }) => {
  const [open, setOpen] = useState(false);
  const { MyModal, openModalFunc } = useModalState("업데이트 완료");

  useEffect(() => {
    //hull 정보가 맞으면
    if (hullInfo !== undefined) setOpen(true);
    if (hullInfo === undefined) setOpen(false);

    return () => {};
  }, [hullInfo]);

  const completeHandler = async (hullsq) => {
    const result = await AdminHandler.updateHullComplte(hullsq);
    await resetHullState(hullsq);
    await openModalFunc(result.message);
  };

  if (hullInfo !== undefined) {
    const { HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD, complete } = hullInfo;

    return (
      <>
        <Modal
          title="선체 정보 조회 및 수정"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => {
            resetHullState();
            setOpen(false);
          }}
          width={900}
        >
          <section>
            <h3>선체 정보</h3>
            <article className={classes["info-wrapper"]}>
              <div>
                <p>조선소</p>
                <hr />
                <h3>{SHIPYARD}</h3>
              </div>
              <div>
                <p>선체 종류</p>
                <hr />
                <h3>{HULL_TYPE}</h3>
              </div>
              <div>
                <p>선체 번호</p>
                <hr />
                <h3>{HULL_NO}</h3>
              </div>
              <div>
                <p>작업 완료 여부</p>
                <hr />
                <h3>{complete === 0 ? "작업 진행 중" : "작업 완료"}</h3>
              </div>
            </article>
          </section>

          <MyModal />
          <Button
            onClick={async () => {
              await completeHandler(HULL_SQ);
            }}
          >
            업데이트
          </Button>
        </Modal>
      </>
    );
  }

  return <h1></h1>;
};
export default HullModal;
