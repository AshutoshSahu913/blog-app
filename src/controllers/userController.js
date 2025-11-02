// Profile fetch and update

const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
  // req.user is set by auth middleware
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.file) updates.profileImage = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
