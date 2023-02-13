import { Button } from "antd";
import Admin from "./Admin";
import EmpMain from "./EmpMain";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./page.module.css";
import CreatorFooter from "./CreatorFooter";

const Main = () => {
  const loginCtx = useLoginCtx();

  return (
    <div className={classes.wrapper}>
      <section className={classes.main}>
        <div className={classes["header-section"]}>
          <div className={classes.header}>
            <h1> 하나 E&T </h1>
          </div>
          <Button className={classes.button} onClick={loginCtx.onLogout}>
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
