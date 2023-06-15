import { CREATE_API } from "utils/createApi";

const API = CREATE_API("emp");

const EmpApi = {
  empLogin: (body) => {
    //id, password
    return fetch(`${API}/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },

  addWork: (body) => {
    return fetch(`${API}/work/list`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },

  addWorkRecord: (body) => {
    return fetch(`${API}/work/record`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },

  getWorkList: () => {
    return fetch(`${API}/work/list`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getWorkRecordList: (EMP_NO) => {
    return fetch(`${API}/work/record/${EMP_NO}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getWorkRecord: (NO) => {
    return fetch(`${API}/work/record/no/${NO}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};

export default EmpApi;
