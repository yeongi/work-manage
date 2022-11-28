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
      message: "사원 넣기 성공",
    });
  } catch (err) {
    console.log(err);
  }
});

//선체 추가
router.post("/hull/add", async (req, res) => {});

//선체 조회
router.get("/hull/:hullno/view", async (req, res) => {});

//블럭 추가
router.post("/blk/:hullno/add", async (req, res) => {});

//블럭 시수 조회
router.get("/blk/:hullno/view", async (req, res) => {});

//블럭 수정
router.post("/blk/:blkno/edit", async (req, res) => {});

module.exports = router;
