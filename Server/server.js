const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const cors=require("cors")
const auth=require("./controllers/auth")
const admin=require("./controllers/admin")
const apis=require("./controllers/api")
const {authenticate}=require("./middleware/auth")
const authClient=require("./controllers/authClient")

const app=express()
const session=require("express-session")
const bodyParser=require("body-parser")
const CookieParser=require('cookie-parser')
const PORT=process.env.PORT || 4000

app.use(cors({
    origin:'*',
    methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))
// app.use(express.static("img"));
// app.use(express.static(__dirname + './views/img'));
// app.use(cors({
//     origin:'*'
// }))
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`)
        .then(()=>console.log("mongodb connected"))
        .catch(err=>console.log("error in connecting mongodb",err));


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(session({secret: process.env.SESSIONS_KEY,cookie:{maxAge:3000}, resave: true, saveUninitialized: true}))
app.use(CookieParser());
// 
app.set("view engine","ejs")
app.set("views","./views")
app.get("/",(req,res)=>{
    res.render("dashboard")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/admin",authenticate ,(req,res)=>{
    res.render('admin')
})
app.get("/data",(req,res)=>{
    res.render("data")
})
//client and userroutes
app.post("/api/register",authClient.register)
app.post("/api/login",authClient.login)
app.get("/api/userdetails/:id", authClient.getUser);
app.get("/api/productid/:id",authClient.getId)
app.post("/api/send-otp",authClient.sendOtp)
app.post("/api/verify-otp",authClient.verifyOtpAndResetPassword)
// app.post("/api")
// apis datarouetsre
app.get("/api",apis.api)
app.get("/api/:category",apis.api_category);
// admin routes
app.post('/admin',admin.admin);
app.post("/login",auth.login)
app.post("/logout",auth.logout);
app.post("/api/update/:id",admin.dataupdate)
app.delete('api/delete/:id', admin.datadelete);
// app.post("/delete",admin.)
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
