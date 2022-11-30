import React from "react";
import { Button, Form, Input, Space } from "antd";
import classes from "./HullManage.module.css";
import AdminHandler from "../../../lib/handler/AdminHandler";

const AddHullForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await AdminHandler.addHull(values);
    console.log(result);
    if (result) alert(result.message);
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
          label="선체 번호"
          name="HULL_NO"
          rules={[
            {
              required: true,
              message: "선체 번호를 입력해 주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="선체 종류"
          name="HULL_TYPE"
          rules={[
            {
              required: true,
              message: "선체 종류를 입력해 주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="조선소 코드"
          name="SHIPYARD"
          rules={[
            {
              required: true,
              message: "조선소를 코드 형식으로 입력해 주세요!",
            },
          ]}
        >
          <Input />
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

export default AddHullForm;
