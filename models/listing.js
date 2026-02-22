const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    price: Number,
    location: String,
    country: String,
    image: {
  filename: {
    type: String
  },
  url: {
    type: String,
    default: "https://unsplash.com/photos/brown-and-black-wooden-house-TiVPTYCG_3E",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/brown-and-black-wooden-house-TiVPTYCG_3E"
        : v
  }
}
    
});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;