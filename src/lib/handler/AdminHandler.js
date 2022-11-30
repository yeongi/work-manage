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

  addHull: async (body) => {
    const result = await AdminApi.addHull(body);
    const addResult = await result.json();

    return addResult;
  },

  getHullList: async () => {
    const result = await AdminApi.getHullList();
    const hullList = await result.json();

    return hullList.data;
  },

  addBlock: async (body) => {
    const result = await AdminApi.addBlock(body);
    const addResult = await result.json();

    return addResult;
  },
};

export default AdminHandler;
