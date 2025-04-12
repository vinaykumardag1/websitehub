require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");
const auth = require("./controllers/auth");
const admin = require("./controllers/admin");
const apis = require("./controllers/api");
const { authenticate } = require("./middleware/auth");
const authClient = require("./controllers/authClient");

const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const CookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process on failure
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSIONS_KEY,
    cookie: { maxAge: 3600000 }, // 1 hour
    resave: true,
    saveUninitialized: true
}));
app.use(CookieParser());

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.get("/", (req, res) => {
    res.render("dashboard");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/admin", authenticate, (req, res) => {
    res.render('admin');
});

// Client and user routes
app.post("/api/register", authClient.register);
app.post("/api/login", authClient.login);
app.get("/api/userdetails/:id", authClient.getUser);
app.get("/api/productid/:id", authClient.getId);
app.post("/api/send-otp", authClient.sendOtp);
app.post("/api/verify-otp", authClient.verifyOtpAndResetPassword);
app.post("/api/favorite/add", authClient.add_fav_items);
app.post("/api/favorite/remove", authClient.remove_fav_items);

// API routes
app.get("/api", apis.api);
app.get("/api/:category", apis.api_category);

// Admin routes
app.post('/admin', admin.admin);
app.post("/login", auth.login);
app.post("/logout", auth.logout);
app.put("/api/update/:id", admin.dataupdate);
app.delete("/api/delete/:id", admin.datadelete);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
