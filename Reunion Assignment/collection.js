const express = require('express');
const jwt = require('jsonwebtoken');
const {
    createUser,
    createPost,
    createComment,
    createLike
} = require('./collection');

const router = express.Router();

// POST /api/authenticate
router.post('/authenticate', (req, res) => {
    // Authenticate user with dummy email and password
    const {
        email,
        password
    } = req.body;
    if (email === 'dummy@example.com' && password === 'dummyPassword') {
        const token = jwt.sign({
            email
        }, 'secretKey'); // Replace 'secretKey' with your own secret key
        res.json({
            token
        });
    } else {
        res.status(401).json({
            error: 'Invalid credentials'
        });
    }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: 'Authentication token required'
        });
    }
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: 'Invalid token'
            });
        }
        req.user = decoded;
        next();
    });
}

// Follow a user
router.post('/follow/:id', authenticateToken, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            email
        } = req.user;

        const followedUser = await User.findById(id);
        if (!followedUser) {
            return res.status(404).send('User not found');
        }

        if (followedUser.followers.includes(email)) {
            return res.status(400).send('Already following this user');
        }

        followedUser.followers.push(email);
        await followedUser.save();

        const currentUser = await User.findOne({
            email
        });
        currentUser.following.push(id);
        await currentUser.save();

        return res.status(200).send('You are now following this user');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
});

// Unfollow a user
router.post('/unfollow/:id', authenticateToken, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            email
        } = req.user;

        const followedUser = await User.findById(id);
        if (!followedUser) {
            return res.status(404).send('User not found');
        }

        if (!followedUser.followers.includes(email)) {
            return res.status(400).send('You are not following this user');
        }

        followedUser.followers = followedUser.followers.filter(follower => follower !== email);
        await followedUser.save();

        const currentUser = await User.findOne({
            email
        });
        currentUser.following = currentUser.following.filter(followingId => followingId !== id);
        await currentUser.save();

        return res.status(200).send('You have unfollowed this user');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
});

// Get user profile
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const {
            email
        } = req.user;

        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const {
            name,
            followers,
            following
        } = user;
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
router.post('/posts', authenticateToken, async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;
        const {
            email
        } = req.user;

        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const post = new Post({
            title,
            description,
            createdBy: user._id
        });

        await post.save();

        user.posts.push(post._id);
        await user.save();

        return res.status(201).json({
            id: post._id,
            title,
            description,
            created_at: post.createdAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
});

// Delete a post
router.delete('/posts/:id', authenticateToken, async (req, res) => {
    const {
        email
    } = req.user;
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (post.createdBy.toString() !== userId) {
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

module.exports = router;