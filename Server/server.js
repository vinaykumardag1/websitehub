
const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const cors=require("cors")
const auth=require("./controllers/auth")
const admin=require("./controllers/admin")
const apis=require("./controllers/api")
const app=express()
const bodyParser=require("body-parser")
const PORT=process.env.PORT || 4000



app.use(cors())





mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`)
        .then(()=>console.log("mongodb connected"))
        .catch(err=>console.log("error in connecting mongodb",err));


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set("view engine","ejs")
app.set("views","views")
app.get("/",(req,res)=>{
    res.render("dashboard")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/admin",(req,res)=>{
    res.render('admin')
})
app.post('/admin',admin.admin);
app.get("/api",apis.api)
app.get("/api/:category",apis.api_category);

app.post("/login",auth.login)



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
