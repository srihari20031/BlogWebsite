import bcrypt from "bcrypt";
import User from "../MongoDb/models/user.js";
import jwt from "jsonwebtoken";

const secret = "hadesCorruptsmachines";

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    console.log("Please provide all fields");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(403).json({ message: "User already registered" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please provide all fields");
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      console.log("User does not exist");
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (validPassword) {
      jwt.sign(
        { username: validUser.username, id: validUser._id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: validUser._id,
            username: validUser.username,
          });
        }
      );
    }
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

export const checkLoggedIn = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

export const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
