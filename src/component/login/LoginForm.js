import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useLoginRecoilState } from "atom/Hook";
import empHandler from "lib/handler/EmpHander";
import { useEffect } from "react";
import LoginSaveClient from "utils/LoginSaveClient";

const loginSaveClient = new LoginSaveClient();

export const LoginForm = ({ openModalWithSetting }) => {
  const [, setLoginState] = useLoginRecoilState();

  const [form] = useForm();

  useEffect(() => {
    if (loginSaveClient.isSaved) {
      const [id, pw] = loginSaveClient.getId();

      form.setFieldsValue({
        emp_no: id,
        password: pw,
      });
    }
  }, [form]);

  const onFinish = async (values) => {
    const result = await empHandler.signIn(values);
    if (result.message === "로그인 성공") {
      if (loginSaveClient.isSaved) {
        loginSaveClient.createInfo(values.emp_no, values.password);
      } else {
        loginSaveClient.updateInfo(values.emp_no, values.password);
      }

      openModalWithSetting({
        message: result.message,
        okHandler: () => {
          const { EMP_NAME, EMP_NO, ADMIN } = result.data;
          setLoginState({
            IS_LOGIN: true,
            EMP_NO,
            EMP_NAME,
            IS_ADMIN: ADMIN,
          });
        },
      });
    }

    if (result.message === "로그인 실패. 사번과 비밀번호를 확인 주세요.") {
      openModalWithSetting(result.message);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label="사번"
        name="emp_no"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
