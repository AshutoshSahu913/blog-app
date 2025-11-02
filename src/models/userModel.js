const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },        // ✅ use 'name' instead of 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
