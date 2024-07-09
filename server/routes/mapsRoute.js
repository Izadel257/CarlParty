const express = require('express');
const router = express.Router(); 
const mapControllers = require ("../controllers/mapControllers"); 


router.get ("/location/:location", mapControllers.getHouseLocation); 
module.exports = router; 