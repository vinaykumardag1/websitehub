require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    // Validate credentials
    if (process.env.LOGIN_USERNAME !== username || process.env.LOGIN_PASSWORD !== password) {
        return res.status(400).send("Wrong credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
        { username }, // Payload (add more claims if needed)
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration
    );

    // Set the token as a cookie
    res.cookie("authToken", token, {
        httpOnly: true, // Protect against XSS
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    // Redirect to the admin page
    res.redirect("/admin");
};
