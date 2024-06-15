const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltrounds = 10;

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(201).json({ users: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unexpected error occured", error: error.message });
  }
};

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name ||
    name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return res.status(422).res.json({ message: "Invalid inputs" });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newPassword = bcrypt.hashSync(password, saltrounds);
    const user = new User({ name, email, password: newPassword });
    await user.save();

    return res
      .status(201)
      .json({ message: "user created successfully", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error", error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (
    !name ||
    name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, saltrounds);
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Unable to find user" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
return res.status(200).json({message:"Login Successfully "})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unexpected error occured", error: error.message });
  }
};
