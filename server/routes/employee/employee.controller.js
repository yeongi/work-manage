const express = require("express");
const router = express.Router();
const empService = require("./employee.service");

//employee
//작성자: yeongi , 장의영

//로그인
router.post("/login", async (req, res) => {
  const body = req.body;
  try {
    const result = await empService.empLogin(body);
    return res
      .status(200)
      .json({ status: 200, data: result[0], message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

//선체 리스트 가져 오기
router.get("/hull/list", async (req, res) => {});

//블럭 리스트 가져 오기
router.get("/hull/:hullno/block", async (req, res) => {});

//업무 리스트 조회
router.get("/work/list", async (req, res) => {});

//업무 추가
router.post("/work/list", async (req, res) => {});

//업무 내역 입력
router.post("/work/record", async (req, res) => {});

//본인 업무 내역 조회
router.get("/work/record/:empno", async (req, res) => {});

//업무 내역 입력
router.post("/work/record/edit/:workno", async (req, res) => {});

module.exports = router;
