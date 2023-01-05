import { dayJsYMD } from "../../lib/dayJs";
import dayjs from "dayjs";
import { v4 } from "uuid";
import classes from "./WorkList.module.css";

const headers = [
  "선체 번호",
  "선체 종류",
  "조선소",
  "블럭 번호",
  "투입 시수",
  "야근 시수",
  "날짜",
  "업무 종류",
  "업무 내용",
  "사원 이름",
  "사원 번호",
];

const WorkList = ({ list }) => {
  return (
    <div className={classes.wrapper}>
      <section className={classes["hedear-wrapper"]}>
        {headers.map((header) => {
          return (
            <div key={v4()} className={classes["header-item"]}>
              {header}
            </div>
          );
        })}
      </section>
      <section>
        {list.map(
          ({
            HULL_NO,
            HULL_TYPE,
            SHIPYARD,
            BLK_NO,
            INP_MH,
            OVERTIME_MH,
            WORK_DATE,
            WORK_DES,
            WORK_TYPE,
            EMP_NAME,
            EMP_NO,
          }) => {
            return (
              <div key={v4()} className={classes["list-wrapper"]}>
                <p className={classes["list-item"]}>{HULL_NO}</p>
                <p className={classes["list-item"]}>{HULL_TYPE}</p>
                <p className={classes["list-item"]}>{SHIPYARD}</p>
                <p className={classes["list-item"]}>{BLK_NO}</p>
                <p className={classes["list-item"]}>
                  <b className={classes["list-item"]}>{INP_MH}</b>
                </p>
                <p className={classes["list-item"]}>
                  <b className={classes["list-item"]}>{OVERTIME_MH}</b>
                </p>
                <p className={classes["list-item"]}>
                  {dayJsYMD(dayjs(WORK_DATE))}
                </p>
                <p className={classes["list-item"]}>{WORK_DES}</p>
                <p className={classes["list-item"]}>{WORK_TYPE}</p>
                <p className={classes["list-item"]}>{EMP_NAME}</p>
                <p className={classes["list-item"]}>{EMP_NO}</p>
              </div>
            );
          }
        )}
      </section>
    </div>
  );
};

export default WorkList;
