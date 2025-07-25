const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const { authenticate } = require("../middlewares/authenticate");

router.get("/", authenticate, bannerController.getAllBanners);

module.exports = router;
