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

  addWorkRecord: async (body) => {
    const result = await EmpApi.addWorkRecord(body);
    const addResult = await result.json();

    return addResult;
  },

  getWorkList: async () => {
    const result = await EmpApi.getWorkList();
    const workList = await result.json();

    return workList.data;
  },

  getWorkRecordList: async (EMP_NO) => {
    const result = await EmpApi.getWorkRecordList(EMP_NO);
    const WorkRecord = await result.json();

    return WorkRecord.data;
  },

  getWorkRecord: async (RECORD_NO) => {
    const result = await EmpApi.getWorkRecord(RECORD_NO);
    const WorkRecord = await result.json();

    return WorkRecord.data;
  },
};

export default empHandler;
