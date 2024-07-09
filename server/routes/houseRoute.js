const express = require('express');
const router = express.Router(); 

const House = require ("../controllers/houseControllers");

router.post("/house", House.createHouse);
router.get("/gethouse", House.getHouseByID);
router.get("/getall", House.getAll)

module.exports = router;