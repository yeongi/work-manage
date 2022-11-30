import EmpApi from "../api/EmpApi";

const empHandler = {
  signIn: async (body) => {
    const result = await EmpApi.empLogin(body);
    const signInRes = await result.json();

    return signInRes;
  },

  addWork: async (body) => {
    const result = await EmpApi.addWork(body);
    const addResult = await result.json();

    return addResult;
  },

  getWorkList: async () => {
    const result = await EmpApi.getWorkList();
    const workList = await result.json();

    return workList.data;
  },
};

export default empHandler;
