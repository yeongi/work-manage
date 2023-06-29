import { Form } from "antd";

export const DForm = ({ formRef, isDisabled, onFinish, children }) => {
  return (
    <Form
      form={formRef}
      name="basic"
      size="large"
      disabled={isDisabled}
      onFinish={onFinish}
      autoComplete="off"
    >
      {children}
    </Form>
  );
};

export const DCheckFormItem = ({ label, name, checkMessage, children }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: { checkMessage },
        },
      ]}
    >
      {children}
    </Form.Item>
  );
};

export const DFormItem = ({ children }) => {
  return <Form.Item>{children}</Form.Item>;
};
