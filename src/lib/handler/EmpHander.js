import EmpApi from "../api/EmpApi";

const empHandler = {
  signIn: async (body) => {
    //body { id, pw}
    const result = await EmpApi.empLogin(body);
    const signInRes = await result.json();

    console.log(signInRes);
    return;
  },
};

export default empHandler;
