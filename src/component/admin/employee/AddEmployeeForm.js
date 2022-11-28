import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import classes from "./Employee.module.css";
import AdminHandler from "../../../lib/handler/AdminHandler";

const AddEmployeeForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await AdminHandler.addEmployee(values);
    if (result.status === 203) alert(`${result.message}`);
    if (result.status === 204) alert(`${result.message} : ${result.data}`);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes["emp-input"]}>
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="사원 번호"
          name="EMP_NO"
          rules={[
            {
              required: true,
              message: "사번을 입력해 주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="사원 이름"
          name="EMP_NAME"
          rules={[
            {
              required: true,
              message: "사원 이름을 입력해 주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="EMP_PW"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="ADMIN"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>관리자 여부</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            제출하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployeeForm;
