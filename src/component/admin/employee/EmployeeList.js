const EmployeeList = ({ empList }) => {
  //to do Select로 바꾸기
  return (
    <div>
      {empList.length > 0 &&
        empList.map((emp) => {
          return (
            <p>
              사원 이름 :{emp.EMP_NAME}
              <br />
              사원 번호 :{emp.EMP_NO}
            </p>
          );
        })}
    </div>
  );
};

export default EmployeeList;
