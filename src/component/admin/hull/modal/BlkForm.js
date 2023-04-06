import { Form, Button, Input } from "antd";
import { useEffect } from "react";

// { BLK_NO, BLK_SQ, HULL_SQ, NORM_MH, RES_MH }

const BlkForm = ({ blkInfo }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      BLK_NO: blkInfo.BLK_NO,
      NORM_MH: blkInfo.NORM_MH,
    });
  }, [blkInfo]);

  const onFinish = async (values) => {
    console.log("Finish:", values);
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
        </Form.Item>
      </Form>
    </>
  );
};

export default BlkForm;
