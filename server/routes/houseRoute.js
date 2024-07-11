const express = require('express');
const router = express.Router(); 

const House = require ("../controllers/houseControllers");

router.post("/house", House.createHouse);
router.get("/gethouse", House.getHouse);
router.get("/getall", House.getAll)
router.put("/update-likes", House.updateLikes)
router.put("/update-dislikes", House.updateDislikes)
router.put("/update-comments", House.updateComments)

module.exports = router;