import { Button, Form, InputNumber, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import classes from "./BlockPutFrom.module.css";
import useMyModal from "hooks/useMyModal";
import AdminHandler from "lib/handler/AdminHandler";

export const BlockPutForm = ({
  BLK_SQ,
  INP_MH: PRE_MH,
  RECORD_NO,
  resetHandler,
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
      openModalFunc("성공적으로 수정되었습니다.", () => {
        closeHandler();
        resetHandler();
      });
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
