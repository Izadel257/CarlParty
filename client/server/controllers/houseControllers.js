
const House = require ("../models/house.model")

exports.createHouse =  async (req, res) => {
    const {name, likes, comments} = req.body; 
    try{
        const house =  new House({
            name, 
            likes, 
            comments,
        })
    } catch(error){
        console.error(error); 
        res.status(500).json({error: "Could not create house"})
    }
}

exports.getHouseByID  = async (req, res)=> {
    const {houseId} = req.body; 

    try {
      
    }
}