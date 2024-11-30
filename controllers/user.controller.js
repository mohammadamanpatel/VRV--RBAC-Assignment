import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
    console.log("req.body",req.body)
  const { name, email, password, role } = req.body;

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new userModel({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    user.token = token;
    user.password = null;
    const cookie_options = {
      MaxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    };
    res.cookie("token", token, cookie_options);
    res.json({ message: "You Loggedin Successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const logoutUser = (req, res) => {
  try {
    res
      .cookie("token", null, {
        MaxAge: 0,
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "You successfully logged Out",
      });
  } catch (error) {
    // console.log(error);
    return res.json({
      success: false,
      message: "You cant logged out",
      error: error.message,
    });
  }
};
