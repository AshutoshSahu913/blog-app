// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { signupController, loginController } = require('../controllers/authController');

// Register new user
router.post('/signup', upload.single('profilePic'), signupController);

// Login existing user
router.post('/login', loginController);

module.exports = router;
