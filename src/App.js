import { Button, Checkbox, Form, Input } from "antd";
import { useState, React } from "react";
import empHandler from "./lib/handler/EmpHander";

function App() {
  const [isAdmin, setLogIn] = useState({ isAdmin: false });

  const onFinish = async (values) => {
    const result = await empHandler.signIn(values);

    if (result.status === 200) {
      setLogIn(result.data.ADMIN);
    }

    console.log(result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="App">
      {isAdmin ? (
        <h1>어드민으로 로그인 하셨네요?</h1>
      ) : (
        <h1>사원으로 로그인 하셨네요?</h1>
      )}
      <h1>Work-Manage with electron</h1>
      <p>일렉트론 웹 개발 언어로 데스크톱 프로그램을 개발할 수 있음</p>
      <p>이걸로 다 베포 해서 하나의 서버로 통신할 예정</p>
      <h1> 페이지 정의 </h1>
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
