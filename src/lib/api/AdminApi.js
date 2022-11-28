import { CREATE_API } from "../createApi";

const API = CREATE_API("admin");

const AdminApi = {
  addEmp: (body) => {
    return fetch(`${API}/emp/add`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};

export default AdminApi;
