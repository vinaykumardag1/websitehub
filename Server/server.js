
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
const session=require("express-session")
const cookie=require("cookie-parser")

app.use(cookie())
app.use(cors())
app.use(session({
    secret:process.env.SESSIONS_KEY,
    resave:false,
    saveUninitialized:true,
}))

const connectionParams={
    useNewUrlParser: true,
    
    useUnifiedTopology: true, 

   
    serverSelectionTimeoutMS: 30000 

  
}

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`
,connectionParams)
        .then(()=>console.log("mongodb connected"))
        .catch(err=>console.log("error in connecting mongodb",err))

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set("view engine","ejs")
app.set("views","views")

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/admin",auth.noCache,auth.getAdmin)
app.post('/admin',admin.admin);
app.get("/api",apis.api)
app.get("/api/:category",apis.api_category);
app.post("/",auth.login)


process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
