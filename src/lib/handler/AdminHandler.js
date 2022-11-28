import AdminApi from "../api/AdminApi";

const AdminHandler = {
  addEmployee: async (body) => {
    const result = await AdminApi.addEmp(body);
    const addResult = await result.json();

    return addResult;
  },
};

export default AdminHandler;
