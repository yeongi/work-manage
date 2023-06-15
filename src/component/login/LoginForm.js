import { Button, Form, Input } from "antd";
import empHandler from "lib/handler/EmpHander";
import { useLoginCtx } from "store/LoginContext";

export const LoginForm = ({ openModalFunc }) => {
  const loginCtx = useLoginCtx();

  const onFinish = async (values) => {
    const result = await empHandler.signIn(values);
    if (result.message === "로그인 성공") {
      openModalFunc(result.message, () => {
        const { EMP_NAME, EMP_NO, ADMIN } = result.data;
        loginCtx.onLogin({
          IS_LOGIN: true,
          EMP_NO,
          EMP_NAME,
          IS_ADMIN: ADMIN,
        });
      });
    }

    if (result.message === "로그인 실패. 사번과 비밀번호를 확인 주세요.") {
      openModalFunc(result.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("에러", errorInfo);
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
