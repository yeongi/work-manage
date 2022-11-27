import { Button } from "antd";
import Admin from "./Admin";
import Employee from "./Employee";
import { useLoginCtx } from "../lib/store/LoginContext";

const Main = () => {
  const loginCtx = useLoginCtx();

  return (
    <>
      <h1> 메인 페이지 입니다.</h1>
      {loginCtx.state.IS_ADMIN ? <Admin /> : <Employee />}

      <Button onClick={loginCtx.onLogout}>로그아웃 하기</Button>
    </>
  );
};

export default Main;
