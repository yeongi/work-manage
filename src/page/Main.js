import { Button } from "antd";
import Admin from "./Admin";
import Employee from "./Employee";
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
      {loginCtx.state.IS_ADMIN ? <Admin /> : <Employee />}
    </>
  );
};

export default Main;
