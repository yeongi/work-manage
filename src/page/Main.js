import { Button } from "antd";
import Admin from "./Admin";
import EmpMain from "./EmpMain";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./page.module.css";
import CreatorFooter from "./CreatorFooter";
import useMyModal from "../lib/state/useMyModal";

const Main = () => {
  const loginCtx = useLoginCtx();
  const { MyModal, openModalFunc } = useMyModal("알림");

  return (
    <div className={classes.wrapper}>
      <MyModal />
      <section className={classes.main}>
        <div className={classes["header-section"]}>
          <div className={classes.header}>
            <h1> 하나 이엔티 </h1>
          </div>
          <Button
            className={classes.button}
            onClick={() => {
              openModalFunc("로그아웃 됐습니다.", loginCtx.onLogout);
            }}
          >
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
