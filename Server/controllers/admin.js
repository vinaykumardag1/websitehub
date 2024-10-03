const User=require("../models/User")
module.exports.admin=async(req,res)=>{
    const existingUser = await User.findOne(
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
    const userData = new User(req.body);
    userData.save()
        .then(() => res.redirect("/admin"))
        .catch(err => res.status(400).send('Error saving data: ' + err));
}


