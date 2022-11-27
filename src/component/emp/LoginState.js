import { useLoginCtx } from "../../lib/store/LoginContext";

const LoginState = () => {
  const loginCtx = useLoginCtx();
  return (
    <>
      <h3>현재 로그인 정보</h3>
      <p>사번 : {loginCtx.state.EMP_NO}</p>
      <p>이름 : {loginCtx.state.EMP_NAME}</p>
      <p>날짜 : "현재 날짜 출력"</p>
    </>
  );
};

export default LoginState;
