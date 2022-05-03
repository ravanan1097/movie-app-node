const mongoose=require("mongoose");

const MovieList=new mongoose.Schema({
    movieName:{type:String},
    rating:{type:Number},
    cast:[{type:String}],
    genre:{type:String},
    releaseDate:{type:Date}
})

module.exports=mongoose.model("Movies",MovieList);