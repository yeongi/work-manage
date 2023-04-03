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

  getBlkList: async (hull_no) => {
    const result = await AdminApi.getBlkList(hull_no);
    const blkList = await result.json();

    return blkList.data;
  },

  getWorkRecordList: async (BLK_SQ) => {
    const result = await AdminApi.getWorkRecordList(BLK_SQ);
    const WorkRecord = await result.json();

    return WorkRecord.data;
  },

  getWorkMonthRecordList: async (ym) => {
    const result = await AdminApi.getWorkMonthRecordList(ym);
    const WorkRecord = await result.json();

    return WorkRecord.data;
  },

  getWorkHullRecordList: async (hull_sq) => {
    const result = await AdminApi.getWorkHullRecordList(hull_sq);
    const WorkRecord = await result.json();

    return WorkRecord.data;
  },

  updateHullComplte: async (hull_sq) => {
    const result = await AdminApi.updateHullComplete(hull_sq);
    return await result.json();
  },

  getHullInfo: async (hull_sq) => {
    const result = await AdminApi.getHullInfo(hull_sq);
    return await result.json();
  },
};

export default AdminHandler;
