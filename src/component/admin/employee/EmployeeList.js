import React from "react";
import { List } from "antd";

import classes from "./EmployeeList.module.css";

const EmployeeList = ({ empList }) => {
  return (
    <>
      {/* FIXME: 사원 리스트 안나오는 이슈
      <EmpRecordModal title={"작업 내역"} EMP_NO={EMP_NO}>
        <EmpWorkRecord recordList={workRecordList} EMP_NAME={EMP_NAME} />
      </EmpRecordModal> */}
      {empList.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={empList}
          renderItem={(emp) => {
            if (emp.ADMIN) {
              return (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <>
                        <p>
                          관리자 :<strong>{emp.EMP_NAME}</strong>
                        </p>
                        <p>
                          아이디 :<strong>{emp.EMP_NO}</strong>
                        </p>
                        <p>
                          비밀번호 :<strong>{emp.EMP_PW}</strong>
                        </p>
                      </>
                    }
                  />
                </List.Item>
              );
            }

            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div>
                      <span>사원명 : {emp.EMP_NAME} /</span>
                      <span>사번(아이디) : {emp.EMP_NO} /</span>
                      <span>비밀번호 : {emp.EMP_PW} </span>
                      <div className={classes.workContainer}>
                        {emp.record
                          .map(({ WORK_DATE, INP_MH }) => {
                            return (
                              <div className={classes.workFlexBox}>
                                <p className={classes.workDate}>{WORK_DATE}</p>
                                <div>
                                  <p className={classes.workDes}>투입 시수</p>
                                  <strong className={classes.workMh}>
                                    {INP_MH}
                                  </strong>
                                </div>
                              </div>
                            );
                          })
                          .reverse()}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </>
  );
};

export default EmployeeList;
