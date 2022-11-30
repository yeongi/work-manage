import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import empHandler from "../../lib/handler/EmpHander";

const AddWorkForm = ({ workList }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    const result = await empHandler.addWork(values);
    if (result) alert(result.message);
    // refreshHandler();
    form.resetFields();
    return;
  };

  return (
    <div>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="WORK_TYPE"
          rules={[
            {
              required: true,
              message: "업무 종류를 입력하세요.",
            },
          ]}
        >
          <Input placeholder="업무 종류" />
        </Form.Item>
        <Form.Item
          name="WORK_DES"
          rules={[
            {
              required: true,
              message: "업무 상세 내용을 입력하세요.",
            },
          ]}
        >
          <Input placeholder="업무 상세 내용" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              업무 추가
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWorkForm;
