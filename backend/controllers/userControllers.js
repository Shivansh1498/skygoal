import User from "../models/userModel.js";
import { generateToken } from "../config/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        status: "success",
        userInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ status: "error", message: "Login Unsuccessful" });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
    return;
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ status: "error", message: "User already exists" });
      return;
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        status: "success",
        userInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Registration Unsuccessful" });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.user.email });
    if (user) {
      res
        .status(200)
        .json({ status: "success", message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
