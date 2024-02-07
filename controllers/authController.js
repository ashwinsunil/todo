const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "your-secret-key";
const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { phone_number } = req.body;

  try {
    // Check if a user with the provided phone number already exists
    const existingUser = await User.findOne({ phone_number });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      phone_number,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { phone_number } = req.body;

  try {
    // Find the user by the phone number
    let user = await User.findOne({ phone_number });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.user = {
      _id: user.id,
    };
    // Since the phone number is not hashed, no need for comparison
    // Proceed with creating a JWT token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
