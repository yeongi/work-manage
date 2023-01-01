import { useLoginCtx } from "../../lib/store/LoginContext";
import dayJs from "dayjs";

const LoginState = () => {
  const loginCtx = useLoginCtx();
  const dayjs = dayJs();
  const today = [dayjs.year(), dayjs.month() + 1, dayjs.date()].join("-");
  return (
    <div>
      <div>
        <h3>현재 로그인 정보</h3>
        {/* to do : 오늘 일 한 업무 기록을 나타내고, 그 시간이 8시간 미만이 되면 안됨 */}
        <p>사번 : {loginCtx.state.EMP_NO}</p>
        <p>이름 : {loginCtx.state.EMP_NAME}</p>
        <p>날짜 : {today}</p>
      </div>
      <div>
        <h3>오늘 한 일</h3>
      </div>
    </div>
  );
};

export default LoginState;
