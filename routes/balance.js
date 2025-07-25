const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balanceController");
const { authenticate } = require("../middlewares/authenticate");
const { topUpValidation } = require("../middlewares/validators");

router.get("/balance", authenticate, balanceController.getBalance);
router.post("/topup", topUpValidation, authenticate, balanceController.topUp);

module.exports = router;
