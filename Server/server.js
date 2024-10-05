
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");



const auth = require("./controllers/auth");
const admin = require("./controllers/admin");
const apis = require("./controllers/api");

const app = express();
const PORT = process.env.PORT || 4000;



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.8tdja.mongodb.net/webhub?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Error in connecting MongoDB", err));


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

process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
