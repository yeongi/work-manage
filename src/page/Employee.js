import LoginState from "../component/emp/LoginState";

const Employee = (props) => {
  return (
    <>
      <div>
        <section>
          <LoginState />
        </section>
        <section>
          <h1> 업무 내역 확인</h1>
        </section>
      </div>
    </>
  );
};

export default Employee;
