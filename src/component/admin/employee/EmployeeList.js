import React, { useEffect, useState } from "react";
import { List, Button } from "antd";
import EmpRecordModal from "./EmpRecordModal";
import useEmpRecordList from "../../../lib/state/useEmpRecordList";
import EmpWorkRecord from "../../emp/EmpWorkRecord";
const EmployeeList = ({ empList }) => {
  const [EMP_NO, setEmpNo] = useState(false);
  const [EMP_NAME, setName] = useState("");
  const [workRecordList, getMyWorkRecordList] = useEmpRecordList(EMP_NO);

  useEffect(() => {
    if (EMP_NO) getMyWorkRecordList(EMP_NO);
  }, [EMP_NO, getMyWorkRecordList]);

  return (
    <>
      <EmpRecordModal title={"작업 내역"} EMP_NO={EMP_NO}>
        <EmpWorkRecord recordList={workRecordList} EMP_NAME={EMP_NAME} />
      </EmpRecordModal>
      {empList.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={empList}
          renderItem={(emp) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    <p>
                      사원명 :<b>{emp.EMP_NAME}</b>{" "}
                    </p>
                    <p>
                      사번 :<b>{emp.EMP_NO}</b>{" "}
                    </p>
                    <p>
                      비밀번호 :<b>{emp.EMP_PW}</b>{" "}
                    </p>
                  </>
                }
                description={`${emp.EMP_NAME}님의 업무내역을 조회하시려면 버튼을 클릭하세요. `}
              />
              <Button
                onClick={(e) => {
                  setEmpNo(emp.EMP_NO);
                  setName(emp.EMP_NAME);
                }}
              >
                내역 보기
              </Button>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default EmployeeList;
