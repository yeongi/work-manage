import { CREATE_API } from "../createApi";

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
};
export default EmpApi;
