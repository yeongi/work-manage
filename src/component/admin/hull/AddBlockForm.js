import React from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import classes from "./HullManage.module.css";

const AddBlockForm = (props) => {
  const [form] = Form.useForm();
  // BLK_NO char(255) PK
  // HULL_NO char(255) PK
  // NORM_MH int
  // RES_MH int
  // COMPLETE int

  const onFinish = async (values) => {
    console.log(values);
    form.resetFields();
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["hull-input"]}>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="블럭 번호"
          name="BLK_NO"
          rules={[
            {
              required: true,
              message: "블럭 번호를 입력해 주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="선체 번호"
          name="HULL_NO"
          rules={[
            {
              required: true,
              message: "선체 번호를 입력해 주세요!",
            },
          ]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="표준 M/H"
          name="NORM_MH"
          rules={[
            {
              required: true,
              message: "표준 시수를 입력해 주세요!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
            <Button htmlType="button" onClick={resetHandler}>
              Reset
            </Button>

            <Button type="primary" htmlType="submit">
              제출하기
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlockForm;
