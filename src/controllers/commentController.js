// Add, list, and delete comments

const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

// Add comment to a post 
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;

    if (!text) return res.status(400).json({ message: 'Comment text required' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      text,
      post: postId,
      user: req.user._id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get comments for a post 
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username profileImage').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete comment (comment author or post author can delete)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('post');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // authorize: comment owner or post owner
    if (!comment.user.equals(req.user._id) && !comment.post.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete comment' });
    }

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
