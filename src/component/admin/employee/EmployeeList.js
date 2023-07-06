import React from "react";
import { List } from "antd";
// import useEmpRecordList from "hooks/useEmpRecordList";
// import EmpWorkRecord from "emp/record/EmpWorkRecord";
// import EmpRecordModal from "./EmpRecordModal";

const EmployeeList = ({ empList }) => {
  // const [EMP_NO, setEmpNo] = useState(0);
  // const [EMP_NAME, setName] = useState("");
  // const [workRecordList, getMyWorkRecordList] = useEmpRecordList(EMP_NO);
  // useEffect(() => {
  //   if (EMP_NO) getMyWorkRecordList(EMP_NO);
  // }, [EMP_NO, getMyWorkRecordList]);

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
                          관리자 :<b>{emp.EMP_NAME}</b>{" "}
                        </p>
                        <p>
                          아이디 :<b>{emp.EMP_NO}</b>{" "}
                        </p>
                        <p>
                          비밀번호 :<b>{emp.EMP_PW}</b>{" "}
                        </p>
                      </>
                    }
                  />
                </List.Item>
              );
            }

            let content;

            if ("DAY_RECORD" in emp) {
              const { work_type, INP_MH } = emp.DAY_RECORD;
              content = `금일 시수 투입 여부 : 🆗 / 총 투입 시수:${INP_MH} / 작업:${work_type}`;
            } else {
              content = `금일 시수 투입 여부 : ❌`;
            }

            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div>
                      <span>사원명 : {emp.EMP_NAME} /</span>
                      <span>사번(아이디) : {emp.EMP_NO} /</span>
                      <span>비밀번호 : {emp.EMP_PW} </span>
                      <p>
                        <strong>{content}</strong>
                      </p>
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
