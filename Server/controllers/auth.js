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

