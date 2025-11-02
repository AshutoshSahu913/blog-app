const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');

// get current user profile
router.get('/me', auth, userController.getProfile);

// update profile (username, email, profileImage)
router.put('/me', auth, upload.single('profileImage'), userController.updateProfile);

module.exports = router;
