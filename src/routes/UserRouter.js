const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/profile', UserController.CustomerInfo);

module.exports = router