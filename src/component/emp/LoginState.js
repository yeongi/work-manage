import { useLoginCtx } from "../../lib/store/LoginContext";
import dayJs from "dayjs";
import { dayJsYMD } from "../../lib/dayJs";
import WorkList from "./WorkList";
import classes from "./EmpMain.module.css";
import { useEffect } from "react";

const LoginState = ({ myList }) => {
  const loginCtx = useLoginCtx();
  const today = dayJsYMD(dayJs());

  useEffect(() => {
    const todayInput = myList.reduce((acc, cur) => {
      return acc + cur.INP_MH;
    }, 0);

    loginCtx.setMH(todayInput);
  }, [myList]);

  return (
    <div className={classes.wrapper}>
      <div className={classes["state-wrapper"]}>
        <section className={classes.login}>
          <h3>현재 로그인 정보</h3>
          {/* to do : 오늘 일 한 업무 기록을 나타내고, 그 시간이 8시간 미만이 되면 안됨 */}
          <div className={classes["login-box"]}>
            <p>사번 : {loginCtx.state.EMP_NO}</p>
            <p>이름 : {loginCtx.state.EMP_NAME}</p>
            <p>날짜 : {today}</p>
          </div>
        </section>
        <section className={classes.work}>
          <h3>금일 업무 내역</h3>
          <div className={classes["state-box"]}>
            <p>
              {/* 아이콘 추가 하기 */}! 금일 업무 내역의 <b>"투입 시수"</b>가{" "}
              <b>8시간</b> 이상 입력되어야 합니다.
            </p>
            <p>
              <b>금일 총 투입 시수 (M/H)</b> :
              <b className={classes.MH}> {loginCtx.state.MH}</b> M/H
            </p>
          </div>
        </section>
      </div>
      {myList.length === 0 ? (
        <h3>"금일 업무내역이 존재 하지 않습니다."</h3>
      ) : (
        <WorkList myList={myList} />
      )}
    </div>
  );
};

export default LoginState;
