require("dotenv").config()
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




const connectWithRetry = () => {
  console.log("Attempting MongoDB connection...");
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.mongodb.net/webhub?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Timeout of 30 seconds
      }
     
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error in connecting MongoDB, retrying in 5 seconds...", err);
   
    });
};

connectWithRetry();


app.set("view engine", "ejs");
app.set("views", "views");

// Routes
app.get("/", (req, res) => {
    res.send("Express works");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/admin", admin.admin);
app.get("/api", apis.api);
app.get("/api/:category", apis.api_category);
app.post("/login", auth.login);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
