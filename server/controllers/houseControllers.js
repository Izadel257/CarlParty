
const House = require ("../models/house.model");

exports.createHouse =  async (req, res) => {
    const {houseName, createdAt, likes, comments} = req.body; 
    try{
        const house =  new House({
            houseName,
            createdAt
        })
        await house.save(); 
        res.status(200).json({message: "House created with success"});
    } catch(error){
        console.error(error); 
        res.status(500).json({error: "Could not create house"});
    }
}

exports.getHouseByID  = async (req, res)=> {
    const {houseId} = req.body; 

    try {
      
    } catch(error){
        console.error(error);
        res.status(500).json({error: "server error: could not get house based on ID provided"});
    }
}

exports.updateComments = async (req, res) => {
    const {comment} = req.body;
    try {

    } catch (error){
        console.error(error);
        res.status (500).json({error: "server error: unable to add your comment"});
    }
}

exports.updateLikes = async (req, res) => { 
    try{

    } catch (error){
        console.error(error); 
        res.status (500).json({error: "server error: unable to add the like"});
    }
}

exports.updateDislikes = async (req, res) => { 
    try{

    } catch (error){
        console.error(error); 
        res.status (500).json({error: "server error: unable to add the dislike"});
    }
}

exports.getAll = async(req, res) => {
    try{
        const houses = await House.find({}).exec(); 
        // console.log("houses retrieved", houses)
         res.status(200).json(houses); 
    } catch(error){
        console.error(error)
        res.status(500).json({error:"unable to get all the houses" })
    }
}