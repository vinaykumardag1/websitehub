const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = (req, res, next) => {
    const token = req.cookies?.authToken; // Check if token exists in cookies

    if (!token) {
        console.log("No token found. Redirecting to login.");
        setNoCacheHeaders(res);
        return res.redirect("/login"); // Redirect to login if no token
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user = decoded; // Store decoded payload under req.user

        // Set no-cache headers to prevent caching of authenticated responses
        setNoCacheHeaders(res);

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Invalid token:", error.message);

        setNoCacheHeaders(res);

        if (error.name === "TokenExpiredError") {
            // Handle token expiration specifically
            return res.status(401).send("Session expired. Please log in again.");
        }

        // Handle other JWT errors
        return res.status(401).send("Invalid token. Please log in again.");
    }
};

// Helper function to set no-cache headers
function setNoCacheHeaders(res) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
}

