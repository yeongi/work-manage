import { Button } from "antd";
import Admin from "./Admin";
import EmpMain from "./EmpMain";
import classes from "./page.module.css";
import CreatorFooter from "./CreatorFooter";
import useModalState from "hooks/useModalState";
import { useLoginRecoilValue, useLogOutRecoil } from "atom/Hook";

const Main = () => {
  const loginState = useLoginRecoilValue();
  const logOut = useLogOutRecoil();
  const { ModalElement, openModalWithSetting } = useModalState("알림");

  const logoutHandler = () => {
    openModalWithSetting({
      message: "로그아웃 됐습니다.",
      okHandler: logOut,
    });
  };

  return (
    <div className={classes.wrapper}>
      <ModalElement />
      <header className={classes["header-wrapper"]}>
        <div className={classes.header}>
          <h1> 하나 이엔티 시수관리 </h1>
        </div>
        <Button className={classes.button} onClick={logoutHandler}>
          로그아웃 하기
        </Button>
      </header>
      <section className={classes["body-section"]}>
        {loginState.IS_ADMIN ? <Admin /> : <EmpMain />}
      </section>
      <CreatorFooter />
    </div>
  );
};

export default Main;
