// CRUD for posts

const Post = require('../models/postModel');

// Create post (authenticated)
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email profilePic") // ✅ fixed field names
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email profilePic"); // ✅ fixed
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update post (only author)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    if (req.body.tags) post.tags = req.body.tags.split(',').map(t => t.trim());
    if (req.file) post.image = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post (only author)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
