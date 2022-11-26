import { Button, Checkbox, Form, Input } from "antd";
import { useState, React } from "react";
import empHandler from "./lib/handler/EmpHander";

function App() {
  const [isAdmin, setLogIn] = useState({ isAdmin: null });

  const onFinish = async (values) => {
    const result = await empHandler.signIn(values);

    if (result.status === 200) {
      setLogIn(result.data.ADMIN);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="App">
      <h1>Work-Manage with electron</h1>
      <h3>로그인 페이지 입니다.</h3>
      <p> 사원 분들은 관리자님에게 아이디 생성을 요청해야 합니다.</p>
      <div>
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
}

export default App;
