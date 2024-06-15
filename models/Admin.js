const mongoose=require("mongoose");
const adminSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    addMovies:[{
        type:String
    }]
})

module.exports=mongoose.model("Admin",adminSchema)