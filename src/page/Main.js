import { Button } from "antd";
import Admin from "./Admin";
import EmpMain from "./EmpMain";
import { useLoginCtx } from "../lib/store/LoginContext";
import classes from "./page.module.css";

const Main = () => {
  const loginCtx = useLoginCtx();

  return (
    <>
      <div className={classes.main}>
        <h1> WORK - MANAGE </h1>
        <Button onClick={loginCtx.onLogout}>로그아웃 하기</Button>
      </div>
      <hr />
      {loginCtx.state.IS_ADMIN ? <Admin /> : <EmpMain />}
    </>
  );
};

export default Main;
