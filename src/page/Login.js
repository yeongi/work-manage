import { Button, Form, Input } from "antd";
import empHandler from "lib/handler/EmpHander";
import { useLoginCtx } from "lib/store/LoginContext";
import classes from "./Login.module.css";
import useModalState from "lib/state/useMyModal";

const Login = () => {
  const loginCtx = useLoginCtx();
  const { MyModal, openModalFunc } = useModalState("로그인 결과");

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
    <div className={classes["login-wrapper"]}>
      {<MyModal />}
      <section className={classes["header-section"]}>
        <div>
          <h1>하나 E&T 시수관리</h1>
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
      </div>
    </div>
  );
};

export default Login;
