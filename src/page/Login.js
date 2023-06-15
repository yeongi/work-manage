import classes from "./Login.module.css";
import useModalState from "hooks/useMyModal";
import { LoginForm } from "component/login/LoginForm";

const Login = () => {
  const { MyModal, openModalFunc } = useModalState("로그인 결과");

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
        <LoginForm openModalFunc={openModalFunc} />
      </div>
    </div>
  );
};

export default Login;
