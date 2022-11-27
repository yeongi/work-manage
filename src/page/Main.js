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
        <h1> 메인 페이지 입니다.</h1>

        <Button onClick={loginCtx.onLogout}>로그아웃 하기</Button>
      </div>
      {loginCtx.state.IS_ADMIN ? <Admin /> : <Employee />}
    </>
  );
};

export default Main;
