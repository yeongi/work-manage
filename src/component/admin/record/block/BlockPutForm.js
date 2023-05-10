import { Button, Form, InputNumber, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import classes from "./BlockPutFrom.module.css";
import useMyModal from "../../../../lib/state/useMyModal";
import AdminHandler from "../../../../lib/handler/AdminHandler";

export const BlockPutForm = ({
  BLK_SQ,
  INP_MH: PRE_MH,
  RECORD_NO,
  getBlkWorkRecordList,
  closeHandler,
}) => {
  const [formRef] = useForm();
  const { MyModal, openModalFunc } = useMyModal("알림");

  const onFinishHandler = async ({ INP_MH: AFTER_MH }) => {
    const res = await AdminHandler.updateBlkMH({
      PRE_MH,
      AFTER_MH,
      BLK_SQ,
      RECORD_NO,
    });

    if (res.status === 200)
      openModalFunc(
        "성공적으로 수정되었습니다." +
          `블럭 sq: ${BLK_SQ} 전 투입 시수 :${PRE_MH} 후 투입시수 ${AFTER_MH} 기록 번호 :${RECORD_NO}`,
        () => {
          closeHandler();
          getBlkWorkRecordList();
        }
      );
  };

  return (
    <>
      <Form
        form={formRef}
        onFinish={onFinishHandler}
        initialValues={{ INP_MH: PRE_MH }}
        layout="inline"
        className={classes["form"]}
      >
        <Space>
          <Form.Item name="INP_MH">
            <InputNumber placeholder="M/H" step={0.5} min={0} max={24} />
          </Form.Item>
          <Button htmlType="submit">수정 하기</Button>
        </Space>
      </Form>
      <MyModal />
    </>
  );
};
