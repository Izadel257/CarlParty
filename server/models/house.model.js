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
    "createdAt": {
      type: Date, 
      default: mongoose.now
    }                    
  }
  );
  houseSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id; // Transform _id to id
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
const House = mongoose.model("House", houseSchema);
module.exports = House;