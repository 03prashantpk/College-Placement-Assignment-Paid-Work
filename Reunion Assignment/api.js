const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('./models');

const router = express.Router();

// POST /api/authenticate
router.post('/authenticate', (req, res) => {
  // Authenticate user with dummy email and password
  const { email, password } = req.body;
  if (email === 'dummy@example.com' && password === 'dummyPassword') {
    const token = jwt.sign({ email }, 'secretKey'); // Replace 'secretKey' with your own secret key
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ error: 'Authentication token required' });
  }
  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Create a new user
router.post('/users', async (req, res) => {
    try {
      // Retrieve user data from the request body
      const { name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.UserSchema.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const user = new User({ name, email, password });
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign({ email }, 'secretKey'); // Replace 'secretKey' with your own secret key
  
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  });

// Follow a user
router.post('/api/follow/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const followedUser = await models.UserSchema.findById(id);
    if (!followedUser) {
      return res.status(404).send('User not found');
    }

    if (followedUser.followers.includes(userId)) {
      return res.status(400).send('Already following this user');
    }

    followedUser.followers.push(userId);
    await followedUser.save();

    const currentUser = await models.UserSchema.findById(userId);
    currentUser.following.push(id);
    await currentUser.save();

    return res.status(200).send('You are now following this user');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Unfollow a user
router.post('/api/unfollow/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const followedUser = await models.UserSchema.findById(id);
    if (!followedUser) {
      return res.status(404).send('User not found');
    }

    if (!followedUser.followers.includes(userId)) {
      return res.status(400).send('You are not following this user');
    }

    followedUser.followers = followedUser.followers.filter((followerId) => followerId !== userId);
    await followedUser.save();

    const currentUser = await models.UserSchema.findById(userId);
    currentUser.following = currentUser.following.filter((followingId) => followingId !== id);
    await currentUser.save();

    return res.status(200).send('You have unfollowed this user');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Get user profile
router.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await models.UserSchema.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name, followers, following } = user;
    const numFollowers = followers.length;
    const numFollowing = following.length;

    return res.status(200).json({
      name,
      numFollowers,
      numFollowing
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Add a new post
router.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const user = await models.UserSchema.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const post = new models.PostSchema({
      title,
      description,
      user_id: userId
    });

    await post.save();

    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({
      id: post._id,
      title,
      description,
      created_at: post.created_at
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Delete a post
router.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const post = await models.PostSchema.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    if (post.user_id.toString() !== userId) {
      return res.status(401).json({
        message: 'You are not authorized to delete this post'
      });
    }

    await post.remove();

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Like a post
router.post('/like/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    const post = await models.PostSchema.findById(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.likes.includes(email)) {
      return res.status(400).send('You have already liked this post');
    }

    post.likes.push(email);
    await post.save();

    return res.status(200).send('Post liked successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Unlike a post
router.post('/unlike/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    const post = await models.PostSchema.findById(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (!post.likes.includes(email)) {
      return res.status(400).send('You have not liked this post');
    }

    post.likes = post.likes.filter((like) => like !== email);
    await post.save();

    return res.status(200).send('Post unliked successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

// Add a comment to a post
router.post('/comment/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const { email } = req.user;
  
      const post = await models.PostSchema.findById(id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const newComment = new models.CommentSchema({
        text: comment,
        created_by: email
      });
  
      await newComment.save();
  
      post.comments.push(newComment._id);
      await post.save();
  
      return res.status(201).json({
        commentId: newComment._id
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  });
  
  // Get a single post with likes and comments
  router.get('/posts/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await models.PostSchema.findById(id)
        .populate('likes', 'email')
        .populate({
          path: 'comments',
          populate: {
            path: 'created_by',
            select: 'email'
          }
        });
  
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const { title, description, created_at, likes, comments } = post;
  
      return res.status(200).json({
        id,
        title,
        description,
        created_at,
        likes: likes.length,
        comments: comments.map((comment) => ({
          id: comment._id,
          text: comment.text,
          created_by: comment.created_by.email
        }))
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  });
  
  // Get all posts by authenticated user
  router.get('/all_posts', authenticateToken, async (req, res) => {
    try {
      const { email } = req.user;
      const user = await models.UserSchema.findOne({ email }).populate('posts');
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const posts = user.posts.map((post) => ({
        id: post._id,
        title: post.title,
        description: post.description,
        created_at: post.created_at,
        comments: post.comments.length,
        likes: post.likes.length
      }));
  
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  });

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });
  
module.exports = router;
  