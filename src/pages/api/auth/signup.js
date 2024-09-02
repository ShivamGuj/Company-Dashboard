import dbConnect from "../../../lib/db";
import User from "../../../model/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(201).json({ message: "User created" });
}
