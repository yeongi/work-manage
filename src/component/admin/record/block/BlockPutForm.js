import { Button, Form, InputNumber, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import classes from "./BlockPutFrom.module.css";
import useMyModal from "../../../../lib/state/useMyModal";

export const BlockPutForm = ({
  BLK_SQ,
  INP_MH: PRE_MH,
  RECORD_NO,
  closeHandler,
}) => {
  const [formRef] = useForm();
  const { MyModal, openModalFunc } = useMyModal("알림");

  const onFinishHandler = ({ INP_MH: AFTER_MH }) => {
    console.log();

    openModalFunc(
      "성공적으로 수정되었습니다." +
        `블럭 sq: ${BLK_SQ} 전 투입 시수 :${PRE_MH} 후 투입시수 ${AFTER_MH} 기록 번호 :${RECORD_NO}`,
      closeHandler
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
