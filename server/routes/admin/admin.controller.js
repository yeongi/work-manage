const express = require("express");
const router = express.Router();
const AdminService = require("./admin.service");

// admin 관리자
// 작성자: yeongi, 장의영

//사원 추가
router.post("/emp/add", async (req, res) => {});

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
