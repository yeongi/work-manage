const express = require("express");
const router = express.Router();
const AdminService = require("./admin.service");

//employee
router.post("/login", async (req, res) => {
  console.log("로그인 처리");
  const body = req.body;

  try {
    const result = await AdminService.addEmployee(body);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
