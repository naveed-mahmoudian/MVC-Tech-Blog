const router = require("express").Router();
const Post = require("../../models/Post");

// Create Post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id,
    });

    if (!newPost) {
      res.status(400).json({ message: "Unable to create post" });
    }

    res.render("dashboard");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
