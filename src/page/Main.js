import { Button } from "antd";
import Admin from "./Admin";
import EmpMain from "./EmpMain";
import { useLoginCtx } from "store/LoginContext";
import classes from "./page.module.css";
import CreatorFooter from "./CreatorFooter";
import useModalState from "hooks/useModalState";

const Main = () => {
  const loginCtx = useLoginCtx();
  const { ModalElement, openModalWithSetting } = useModalState("알림");

  const logoutHandler = () => {
    openModalWithSetting({
      message: "로그아웃 됐습니다.",
      okHandler: loginCtx.onLogout,
    });
  };

  return (
    <div className={classes.wrapper}>
      <ModalElement />
      <section className={classes.main}>
        <div className={classes["header-section"]}>
          <div className={classes.header}>
            <h1> 하나 이엔티 시수관리 </h1>
          </div>
          <Button className={classes.button} onClick={logoutHandler}>
            로그아웃 하기
          </Button>
        </div>
      </section>
      <section className={classes["body-section"]}>
        {loginCtx.state.IS_ADMIN ? <Admin /> : <EmpMain />}
        <CreatorFooter />
      </section>
    </div>
  );
};

export default Main;
