import React from "react";
import { Button, Form, Input, Space } from "antd";
import classes from "../HullManage.module.css";
import AdminHandler from "lib/handler/AdminHandler";
import useModalState from "hooks/useModalState";

const AddHullForm = ({ refreshHandler }) => {
  const [form] = Form.useForm();

  const { ModalElement, openModalWithSetting } = useModalState("추가");

  const onFinish = async (values) => {
    const result = await AdminHandler.addHull(values);
    if (result)
      openModalWithSetting({
        message: result.message,
        okHandler: () => {
          refreshHandler();
          form.resetFields();
        },
      });
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["hull-input"]}>
      <ModalElement />
      <Form
        form={form}
        name="basic"
        size="large"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
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
          <Input placeholder="HULL_NO" />
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
          <Input placeholder="HULL_TYPE" />
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
          <Input placeholder="SHIPYARD" />
        </Form.Item>
        <div style={{ float: "right" }}>
          <Form.Item>
            <Space>
              <Button htmlType="button" onClick={resetHandler}>
                Reset
              </Button>

              <Button type="primary" htmlType="submit">
                등록하기
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddHullForm;
