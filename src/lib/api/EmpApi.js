const CREATE_API = "http://localhost:5000/emp";

const EmpApi = {
  empLogin: (body) => {
    //id, password
    return fetch(`${CREATE_API}/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};
export default EmpApi;
