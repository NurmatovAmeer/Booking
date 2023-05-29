import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const user = User.find(req.body.username);
    if (user) {
      res
        .status(200)
        .json({ message: "user with this username has already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json({ message: "auth Controller error register", err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password or Username is invalid" });
    }

    const { password, isAdmin, ...otherDetails } = user._doc;
    otherDetails.isAdmin = isAdmin;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_secret
    );

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(otherDetails);
  } catch (err) {
    res.status(500).json({ message: "auth Controller error login", err });
  }
};
