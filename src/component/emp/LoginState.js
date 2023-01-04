import { useLoginCtx } from "../../lib/store/LoginContext";
import dayJs from "dayjs";
import { dayJsYMD } from "../../lib/dayJs";
import WorkList from "./WorkList";

const LoginState = ({ myList }) => {
  const loginCtx = useLoginCtx();
  const today = dayJsYMD(dayJs());
  console.log(myList);

  const todayInput = myList.reduce((acc, cur) => {
    return acc + cur.INP_MH;
  }, 0);

  return (
    <div>
      <div>
        <h3>현재 로그인 정보</h3>
        {/* to do : 오늘 일 한 업무 기록을 나타내고, 그 시간이 8시간 미만이 되면 안됨 */}
        <p>사번 : {loginCtx.state.EMP_NO}</p>
        <p>이름 : {loginCtx.state.EMP_NAME}</p>
        <p>날짜 : {today}</p>
      </div>
      <div style={{ height: "auto" }}>
        <h1>금일 업무 내역</h1>
        <p>
          금일 업무 내역의 <b>"투입 시수"</b>가 <b>8시간</b> 이상 입력되어야
          합니다.
        </p>
        <p>
          <b>금일 투입 시수 (M/H)</b> : {todayInput}
        </p>
        {myList.length > 0 ? (
          <WorkList list={myList} />
        ) : (
          <h3>"금일 업무내역이 존재 하지 않습니다."</h3>
        )}
      </div>
    </div>
  );
};

export default LoginState;
