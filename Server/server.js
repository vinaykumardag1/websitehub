// Ensure you have .env configured
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");
const session = require("express-session");
const cookie = require("cookie-parser");

// Importing routes and controllers
const auth = require("./controllers/auth");
const admin = require("./controllers/admin");
const apis = require("./controllers/api");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cookie());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSIONS_KEY,
    resave: false,
    saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Error in connecting MongoDB", err));

// Set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
app.get("/", (req, res) => {
    res.send("Express works");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/admin", auth.noCache, auth.getAdmin);
app.post("/admin", admin.admin);
app.get("/api", apis.api);
app.get("/api/:category", apis.api_category);
app.post("/login", auth.login);

// Error handling for unhandled promises and exceptions
process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
