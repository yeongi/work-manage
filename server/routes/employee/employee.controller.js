const express = require("express");
const router = express.Router();
const empService = require("./employee.service");

//employee
router.get("", async (req, res) => {
  const body = req.body;
  try {
    const result = await empService.A(body);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
