const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please provide a valid email address"],
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'website' }]

});
const userData=mongoose.model('userdatas',userSchema)
module.exports=userData;
