import React from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import classes from "./EmpManage.module.css";
import AdminHandler from "../../../lib/handler/AdminHandler";
import useModalState from "../../../lib/state/useMyModal";

const AddEmployeeForm = ({ refreshHandler }) => {
  const [form] = Form.useForm();

  const { MyModal, openModalFunc } = useModalState("사원 추가");

  const onFinish = async (values) => {
    const result = await AdminHandler.addEmployee(values);
    if (result.status === 203) {
      openModalFunc(`${result.message}`);
    }
    if (result.status === 204) {
      openModalFunc(`${result.message} : ${result.data}`);
    }
    form.resetFields();
    refreshHandler();
  };

  return (
    <div className={classes["emp-input"]}>
      <MyModal />
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
          label="사원 번호"
          name="EMP_NO"
          rules={[
            {
              required: true,
              message: "사번을 입력해 주세요!",
            },
          ]}
        >
          <Input placeholder="사원 번호 입력" />
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
          <Input placeholder="사원 이름 입력" />
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
          <Input placeholder="사원 비밀번호 입력" />
        </Form.Item>

        <Form.Item
          name="ADMIN"
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Space>
            <Checkbox>관리자 여부</Checkbox>
            <Button type="primary" htmlType="submit">
              등록하기
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployeeForm;
