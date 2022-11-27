import { Button, Checkbox, Form, Input } from "antd";
import empHandler from "../lib/handler/EmpHander";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./page.module.css";

const Login = () => {
  const loginCtx = useLoginCtx();

  const onFinish = async (values) => {
    const result = await empHandler.signIn(values);

    if (result.status === 200) {
      alert(`로그인 결과 : ${result.message}`);
      const { ADMIN, EMP_NAME, EMP_NO } = result.data;
      loginCtx.onLogin({ IS_LOGIN: true, EMP_NO, EMP_NAME, IS_ADMIN: ADMIN });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes["login-wrapper"]}>
      <h1>Work-Manage with electron</h1>
      <h3>로그인 페이지 입니다.</h3>
      <p> 사원 분들은 관리자님에게 아이디 생성을 요청해야 합니다.</p>
      <div className={classes["login-form"]}>
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
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
      </div>
    </div>
  );
};

export default Login;
