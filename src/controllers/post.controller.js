import Post from "../models/Post.model.js";

//CREATE POST
export const createPost = async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
}

// GET ALL POSTS
export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

// GET SINGLE POST
export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
};

// UPDATE POST
export const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(post);
};

// DELETE POST
export const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
};