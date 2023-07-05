import classes from "./Login.module.css";
import useModalState from "hooks/useModalState";
import { LoginForm } from "component/login/LoginForm";

const Login = () => {
  const { ModalElement, openModalWithSetting } = useModalState("로그인 결과");

  return (
    <div className={classes["login-wrapper"]}>
      <ModalElement />
      <section className={classes["header-section"]}>
        <div>
          <h1>하나 E&T 시수관리</h1>
          <h3>Login</h3>
          <p> 사원 분들은 관리자님에게 아이디 생성을 요청해야 합니다.</p>
          <p> 마지막으로 접속한 아이디가 자동으로 저장됩니다.</p>
        </div>
      </section>
      <section className={classes["footer-section"]}>
        <p>제작자 github : yeongi</p>
        <hr />
        <p> 행복한 하루 되세요!</p>
      </section>
      <div className={classes["login-form"]}>
        <LoginForm openModalWithSetting={openModalWithSetting} />
      </div>
    </div>
  );
};

export default Login;
