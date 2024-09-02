import dbConnect from "../../../lib/db";
import User from "../../../model/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, password } = req.body;

    await dbConnect();

    const existingUser = await User.findOne({ email }).lean();

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

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
