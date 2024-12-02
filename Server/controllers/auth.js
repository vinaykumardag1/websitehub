require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");

exports.login = (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate credentials
        if (process.env.LOGIN_USERNAME !== username || process.env.LOGIN_PASSWORD !== password) {
            console.log("Invalid credentials provided.");
            return res.status(400).send("Invalid username or password");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { username }, // Include any additional claims if required
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        // Set the token as a cookie
        res.cookie("authToken", token, {
            httpOnly: true, // Secure against XSS attacks
            sameSite: "strict", // Prevent CSRF
            maxAge: 60 * 60 * 1000, // 1 hour
            secure: process.env.NODE_ENV === "production", // Only set secure cookie in production
        });

        // Initialize session
        req.session.user = { username }; // Store user info in the session
        console.log("User logged in successfully. Redirecting to /admin.");
        
        // Redirect to admin dashboard
        res.redirect("/admin");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Could not log out.");
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.clearCookie("authToken"); // Clear the authToken cookie
        res.redirect("/login");
    });
};
