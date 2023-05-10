import { Form, Button, Input } from "antd";
import AdminHandler from "lib/handler/AdminHandler";
import useModalState from "lib/state/useMyModal";

// { BLK_NO, BLK_SQ, HULL_SQ, NORM_MH, RES_MH }

const BlkForm = ({ blkInfo, refreshHandler }) => {
  const [form] = Form.useForm();

  const { MyModal, openModalFunc } = useModalState("알림");

  form.setFieldsValue({
    BLK_NO: blkInfo.BLK_NO,
    NORM_MH: blkInfo.NORM_MH,
  });

  const onFinish = async (values) => {
    const body = {
      ...values,
      BLK_SQ: blkInfo.BLK_SQ,
    };

    const result = await AdminHandler.updateBlkInfo(body);

    if (result.status === 200) {
      openModalFunc(result.message, async () => {
        await refreshHandler();
      });
    }
  };

  const deleteBlkHandler = async () => {
    const res = await AdminHandler.deleteBlk(blkInfo.BLK_SQ);
    if (res.status === 200) {
      openModalFunc(res.message);
      await refreshHandler();
    }
  };

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="BLK_NO"
          label="블럭 번호 "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="BLK_NO" />
        </Form.Item>

        <Form.Item
          name="NORM_MH"
          label="표준 시수"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="NORM_MH" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {"블럭 정보 업데이트"}
          </Button>
          <Button type="dashed" onClick={deleteBlkHandler}>
            {"삭제 하기"}
          </Button>
        </Form.Item>
      </Form>

      <MyModal />
    </>
  );
};

export default BlkForm;
