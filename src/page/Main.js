import { Button } from "antd";
import Admin from "./Admin";
import Employee from "./Employee";

const Main = (props) => {
  return (
    <>
      <h1> 메인 페이지 입니다.</h1>
      <Admin />
      <Employee />
      <Button onClick={props.logoutHandler}>로그아웃 하기</Button>
    </>
  );
};

export default Main;
