const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');


router.post('/add_comment/:postId', auth, commentController.addComment);
router.get('/get_comments/:postId', commentController.getCommentsByPost);
router.delete('/delete_comment/:postId/:commentId', auth, commentController.deleteComment);

module.exports = router;

module.exports = router;
