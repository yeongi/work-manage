const express = require("express");
const router = express.Router();
const AdminService = require("./admin.service");

// admin 관리자
// 작성자: yeongi, 장의영

//사원 추가
router.post("/emp/add", async (req, res) => {
  const empInfo = req.body;
  try {
    const result = await AdminService.addEmployee(empInfo);
    if (Array.isArray(result))
      return res.status(200).json({
        status: 203,
        message: "사원 넣기 성공",
      });
    if (!Array.isArray(result))
      return res.status(200).json({
        status: 204,
        data: result,
        message: "오류 발생",
      });
  } catch (err) {
    console.log(err);
  }
});

//사원 조회
router.get("/emp/list", async (req, res) => {
  try {
    const result = await AdminService.getEmployeeList();
    return res.status(200).json({
      status: 200,
      data: result,
      message: "사원 가져오기 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//선체 추가
router.post("/hull/add", async (req, res) => {
  const empInfo = req.body;
  try {
    const result = await AdminService.addHull(empInfo);
    if (Array.isArray(result))
      return res.status(200).json({
        status: 205,
        message: "선체 넣기 성공",
      });
    if (!Array.isArray(result))
      return res.status(200).json({
        status: 206,
        data: result,
        message: "오류 발생",
      });
  } catch (err) {
    console.log(err);
  }
});

//선체 리스트 조회
router.get("/hull/list", async (req, res) => {
  try {
    const result = await AdminService.getHullList();
    return res.status(200).json({
      status: 200,
      data: result,
      message: "선체 리스트 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//선체  조회
router.get("/hull/info/:hullno", async (req, res) => {
  try {
    const { hullno } = req.params;
    const result = await AdminService.getHullInfo(hullno);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "선체 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//선체  수정하기
router.put("/hull/info/:hullno", async (req, res) => {
  try {
    const { body } = req;
    const result = await AdminService.updateHullInfo(body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "선체 정보 업데이트 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//블럭 추가
router.post("/blk/add", async (req, res) => {
  const block = req.body;
  try {
    const result = await AdminService.addHullBlock(block);
    if (Array.isArray(result))
      return res.status(200).json({
        status: 205,
        message: "블럭 넣기 성공",
      });
    if (!Array.isArray(result))
      return res.status(200).json({
        status: 206,
        data: result,
        message: "오류 발생",
      });
  } catch (err) {
    console.log(err);
  }
});

//블럭 리스트 조회
router.get("/blk/list/:hullno", async (req, res) => {
  const { hullno } = req.params;
  try {
    const result = await AdminService.getBlkList(hullno);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "블럭 리스트 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//블럭 시수 조회
router.get("/blk/:hullno/view", async (req, res) => {});

//블럭 수정
router.post("/blk/edit", async (req, res) => {
  try {
    const { body } = req;
    const result = await AdminService.updateBlkInfo(body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "블럭 정보 수정 업데이트 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//업무 내역 조회 (블럭기준)
router.get("/work/view/:blkno", async (req, res) => {
  const { blkno } = req.params;
  try {
    const result = await AdminService.getWorkRecordOfBlk(blkno);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "업무 내역 리스트 ( 블럭 기준 ) 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//업무 블럭 별 조화 (선체 기준)
router.get("/work/hull/view/:hullsq", async (req, res) => {
  const { hullsq } = req.params;
  try {
    const result = await AdminService.getBlockListOfHull(hullsq);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "업무 내역 리스트 ( 선체 기준 ) 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//업무 월별 조회 (월 기준)
router.get("/work/month/view/:ym", async (req, res) => {
  const { ym } = req.params;
  try {
    const result = await AdminService.getMonthRecordListOfBLK(ym);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "업무 내역 리스트 ( 블럭 기준 ) 조회 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//블럭 완료 업데이트
router.put("/hull/info/complete/:hullsq", async (req, res) => {
  const { hullsq } = req.params;
  try {
    const result = await AdminService.updateCompleteHull(hullsq);
    return res.status(200).json({
      status: 200,
      data: result[0],
      message: "선체 완료 업데이트",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
