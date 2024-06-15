const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const saltrounds = 10;

exports.addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin Already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, saltrounds);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    return res.status(201).json({ message: "Admin added", admin: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unexpected error", error: error });
  }
};

exports.addminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "")
    return res.status(422).json({ message: "Invalid inputs" });
try {
  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(201).json({message:"Login Successfully"})
} catch (error) {
  console.log(error);
  return res.status(201).json({ message: "Unexpected error" });
}
};
