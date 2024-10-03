require("dotenv").config()

module.exports.login=(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    
    if(process.env.LOGIN_USERNAME !==username || process.env.LOGIN_PASSWORD!==password){
        res.status(400).send("wrong credentails")
    }else{
        res.redirect("/admin")
    }
    
}
module.exports.noCache=(req, res, next)=> {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next()
  }
  module.exports.getAdmin=async(req,res)=>{
    req.session.username=process.env.MONGODB_USERNAME
    res.cookie("sessionId",req.sessionID)
    if (req.session.username) {
        res.render('admin');
    } else {
        res.redirect('/');
    }
  }
  
