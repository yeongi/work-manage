import AdminApi from "../api/AdminApi";

const AdminHandler = {
  addEmployee: async (body) => {
    const result = await AdminApi.addEmp(body);
    const addResult = await result.json();

    return addResult;
  },

  getEmployeeList: async () => {
    const result = await AdminApi.getEmpList();
    const empList = await result.json();

    return empList.data;
  },
};

export default AdminHandler;
