const Data=require("../models/Data")
module.exports.admin=async(req,res)=>{
    const existingUser = await Data.findOne(
        {
             name: req.body.name,
             url:req.body.url,
             category:req.body.category,

         }
    );
    if (existingUser) {
      res.send("website is already existed");
      res.redirect("/")
    }
    const userData = new Data(req.body);
    userData.save()
        .then(() => res.redirect("/admin"))
        .catch(err => res.status(400).send('Error saving data: ' + err));
}


