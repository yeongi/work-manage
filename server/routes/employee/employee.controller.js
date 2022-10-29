const express = require("express");
const router = express.Router();
const empService = require("./employee.service");

//employee
router.post("/login", async (req, res) => {
  const body = req.body;
  try {
    const result = await empService.empLogin(body);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
