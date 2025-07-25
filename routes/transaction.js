const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const transactionController = require("../controllers/transactionController");

router.post("/", authenticate, transactionController.createTransaction)
router.get("/history", authenticate, transactionController.getHistory);

module.exports = router;
