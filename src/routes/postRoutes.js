const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const postController = require('../controllers/postController');

// GET all posts
router.get('/all_posts', postController.getPosts);         
router.get('/view_post/:id', postController.getPost); 

// protected: create, update, delete
router.post('/create_post', auth, upload.single('image'), postController.createPost); // CREATE new post
router.put('/update_post/:id', auth, upload.single('image'), postController.updatePost); // UPDATE post
router.delete('/delete_post/:id', auth, postController.deletePost); // DELETE post


module.exports = router;
