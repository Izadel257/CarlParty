const express = require('express');
const router = express.Router(); 
const logisterController = require ("../controllers/logisterConstrollers")

router.post ("/login", logisterController.login);
router.post ("/register", logisterController.register);
router.post ("/verify", logisterController.verify);
router.post ("/send-code", logisterController.sendCodes);

module.exports = router; 