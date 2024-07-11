const mongoose = require("mongoose");

const houseSchema= new mongoose.Schema({
    "houseName": String,       
    "likes": {
      type:Number, 
      default: 0
      },
    "dislikes": {
      type: Number,
      default: 0
    },
    "comments": [
      {
        "text": String,    
        "timestamp": {
          type: Date, 
          default: mongoose.now
        }
      },
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