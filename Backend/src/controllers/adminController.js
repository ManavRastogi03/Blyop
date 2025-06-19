import User from "../models/userModel.js";
export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    return res.status(200).json({ message: 'User promoted to admin successfully' });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: 'Server error' });
  }
};
