const mongoose = require("mongoose");

const houseSchema= new mongoose.Schema({
    "houseName": String,       
    "likes": Number,
    "comments": [
      {
        "text": String,    
        "timestamp": Date 
      }
    ],
    "reports": Number,                   
    "createdAt": Date,            
    "updatedAt": Date             
  }
  );

const House = mongoose.model("House", houseSchema);
module.exports = House;