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

  getEmpList: () => {
    return fetch(`${API}/emp/list`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  addHull: (hull) => {
    return fetch(`${API}/hull/add`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(hull),
    });
  },

  getHullList: () => {
    return fetch(`${API}/hull/list`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  addBlock: (block) => {
    return fetch(`${API}/blk/add`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(block),
    });
  },

  getBlkList: (hull_no) => {
    return fetch(`${API}/blk/list/${hull_no}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getWorkRecordList: (BLK_SQ) => {
    return fetch(`${API}/work/view/${BLK_SQ}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getWorkMonthRecordList: (ym) => {
    return fetch(`${API}/work/month/view/${ym}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getWorkHullRecordList: (hull_sq) => {
    return fetch(`${API}/work/hull/view/${hull_sq}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getHullInfo: (hullsq) => {
    return fetch(`${API}/hull/info/${hullsq}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  updateHullInfo: (body) => {
    return fetch(`${API}/hull/info/${body.HULL_SQ}`, {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  updateBlkInfo: (body) => {
    return fetch(`${API}/blk/info/edit`, {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};

export default AdminApi;
