const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');

// Get all users
router.get('/get_all_users', auth, userController.getAllUsers);

// Get user by ID
router.get('/:id', auth, userController.getUserById);

// Update user by ID
router.put('/:id', auth, upload.single('profileImage'), userController.updateUserById);

module.exports = router;
