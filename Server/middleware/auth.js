const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

exports.authenticate = (req, res, next) => {
    const token = req.cookies?.authToken; // Optional chaining to handle undefined cookies

    if (!token) {
        res.setHeader("Cache-Control", "no-store"); // Prevent cached responses
        return res.redirect("/login");
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to the request object

        // Prevent caching of authenticated routes
        res.setHeader("Cache-Control", "no-store");
        next();
    } catch (error) {
        console.error("Authentication error:", error.message); // Log error message for clarity

        // Prevent cached responses for invalid tokens
        res.setHeader("Cache-Control", "no-store");
        res.redirect("/login");
    }
};
