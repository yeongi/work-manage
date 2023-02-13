import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useRef } from "react";
import empHandler from "../lib/handler/EmpHander";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./Login.module.css";
import { Avatar } from "antd";
import imgUrl from "../img/junsu.jpg";

const Login = () => {
  const loginCtx = useLoginCtx();

  const inputRef = useRef();

  const focusing = () => inputRef.current.focus({ cursor: "start" });

  const onFinish = async (values) => {
    try {
      const result = await empHandler.signIn(values);
      if (result.status === 200) {
        alert(`로그인 결과 : ${result.message}`);
        const { EMP_NAME, EMP_NO, ADMIN } = result.data;
        loginCtx.onLogin({ IS_LOGIN: true, EMP_NO, EMP_NAME, IS_ADMIN: ADMIN });
      }
    } catch (error) {}
  };

  useEffect(() => {
    focusing();
  }, []);

  const onFinishFailed = (errorInfo) => {
    alert("에러", errorInfo);
    focusing();
  };

  return (
    <div className={classes["login-wrapper"]}>
      <section className={classes["header-section"]}>
        <div>
          <h1>하나 E&T</h1>

          <Avatar src={<img src={imgUrl} alt="avatar" />} />
          <h3>Login</h3>
          <p> 사원 분들은 관리자님에게 아이디 생성을 요청해야 합니다.</p>
        </div>
      </section>
      <section className={classes["footer-section"]}>
        <p>제작자 github : yeongi</p>
        <hr />
      </section>
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
            <Input ref={inputRef} />
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
      </div>
    </div>
  );
};

export default Login;
