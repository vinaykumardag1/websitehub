const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userData = require("../models/userData");
const Data =require("../models/Data")
const nodemailer = require("nodemailer");
const crypto = require("crypto");
// Register a new user
const queue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;
  
  isProcessing = true;
  const { req, res, resolve } = queue.shift();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      resolve();
      isProcessing = false;
      processQueue();
      return;
    }

    const existingUser = await userData.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      resolve();
      isProcessing = false;
      processQueue();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userData({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  resolve();
  isProcessing = false;
  processQueue();
};

exports.register = (req, res) => {
  return new Promise((resolve) => {
    queue.push({ req, res, resolve });
    processQueue();
  });
};
// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await userData.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token validity period
    });

    // Send response
    res.status(200).json({
      message: "Login successful!",
      id: user._id,
      name: user.name,
      token: token, // Ensure the token is being sent
    });
    
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user details by ID
exports.getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userData.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// 
exports.getId = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Data.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// reset Password
// exports.resetPassword = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await userData.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Hash the new password
//     const saltRounds = 10; // Define salt rounds for bcrypt
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Update the user's password
//     await userData.updateOne({ email: email }, { $set: { password: hashedPassword } });

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error occurred in resetPassword:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.verifyOtpAndResetPassword = async (req, res) => {
//   const { email, otp, new_pass } = req.body;

//   try {
//     // Check if the OTP exists and is valid
//     if (!otpStore[email] || otpStore[email].otp !== otp) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }

//     if (Date.now() > otpStore[email].expiresAt) {
//       delete otpStore[email]; // Remove expired OTP
//       return res.status(400).json({ message: "OTP has expired." });
//     }

//     // Hash the new password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(new_pass, saltRounds);

//     // Update the password in the database
//     await userData.updateOne({ email: email }, { $set: { password: hashedPassword } });

//     // Remove OTP after successful reset
//     delete otpStore[email];

//     res.status(200).json({ message: "Password reset successful." });
//   } catch (error) {
//     console.error("Error verifying OTP and resetting password:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// 
let otpStore = {}; // Global object to store OTPs temporarily

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    
    const userExists = await userData.findOne({email:email})
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = crypto.randomInt(1000, 9999).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // 10 minutes

    const transporter = nodemailer.createTransport({
      // service: "Gmail",
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for resetting the password is: ${otp}. It is valid for 10 minutes.`,
    };

   
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, new_password } = req.body;

  try {
    const user=await userData.findOne({email:email})
    if(!user){
      res.json({message:"user not found please register"})
    }
   
    if (!otpStore[email]) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
    
    if (otpStore[email].otp !== otp) {
      console.log("OTP mismatch:", { stored: otpStore[email].otp, received: otp });
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

   
    if (Date.now() > otpStore[email].expiresAt) {
      console.log("OTP expired for email:", email);
      delete otpStore[email]; // Cleanup expired OTP
      return res.status(400).json({ message: "OTP has expired." });
    }

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    
    const result = await userData.updateOne({ email: email }, { $set: { password: hashedPassword } });

    delete otpStore[email];

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error verifying OTP and resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};