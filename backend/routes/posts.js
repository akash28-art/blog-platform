const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/posts", async (req, res) => {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
});

router.post("/posts", auth, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
    });

    await post.save();
    res.json(post);
});

router.put("/posts/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id)
        return res.status(403).json({ msg: "Not allowed" });

    post.title = req.body.title;
    post.content = req.body.content;

    await post.save();

    res.json(post);
});

router.delete("/posts/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id)
        return res.status(403).json({ msg: "Not allowed" });

    await post.deleteOne();

    res.json({ msg: "Deleted" });
});

module.exports = router;