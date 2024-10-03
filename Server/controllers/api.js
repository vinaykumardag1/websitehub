const User=require("../models/User")
module.exports.api=async(req,res)=>{
    const getData=await User.find({})
    res.send(getData)
}
module.exports.api_category=async (req,res)=>{
    const category = req.params.category;
    const getData = await User.find({ category: category });
    res.send(getData);
}