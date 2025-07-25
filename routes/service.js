const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticate } = require('../middlewares/authenticate');

router.get('/', authenticate, serviceController.getAllServices);

module.exports = router;
