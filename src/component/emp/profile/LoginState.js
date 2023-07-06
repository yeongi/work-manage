import dayJs from "dayjs";
import { dayJsYMD } from "utils/dayJs";
import classes from "./LoginState.module.css";
import { useLoginRecoilValue } from "atom/Hook";

const LoginState = () => {
  const loginState = useLoginRecoilValue();
  const today = dayJsYMD(dayJs());

  return (
    <div className={classes.wrapper}>
      <section className={classes.login}>
        <h3>현재 로그인 정보</h3>
        <div className={classes["login-box"]}>
          <p>사번 : {loginState.EMP_NO}</p>
          <p>이름 : {loginState.EMP_NAME}</p>
          <p>날짜 : {today}</p>
        </div>
      </section>
      <section className={classes.work}>
        <h3>공지 사항</h3>
        <div className={classes["state-box"]}>
          <p>
            ! 금일 업무 내역의 <b>"투입 시수"</b>가<b>"8시간"</b>
            이상 입력되어야 합니다.
          </p>
          <p>
            ! 투입 시수가 <b>"8시간"</b>이하면 로그아웃이 되지않습니다!
          </p>
          <p>
            <b>금일 총 투입 시수 (M/H)</b> :
            <b className={classes.MH}> {loginState.MH}</b> M/H
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginState;
