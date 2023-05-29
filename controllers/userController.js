import User from "../models/User.js";
// Update user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "users route update problem" }, err);
  }
};
// delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "user has been deleted" });
  } catch (err) {
    return res.status(500).json({ message: "users route delete problem" }, err);
  }
};
// Get One user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "users route delete problem" }, err);
  }
};
// Get All users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "users route delete problem" }, err);
  }
};
