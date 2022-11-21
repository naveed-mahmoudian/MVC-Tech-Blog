const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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

// Go to specific post
router.get("/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
    }

    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);

    res.render("post", { loggedIn: req.session.loggedIn, post });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create Comment
router.post("/comments", async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    if (!newComment) {
      res.status(400).json({ message: "Unable to create comment" });
    }

    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit Post
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.user_id,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).render("dashboard");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Post
router.delete("/delete/:id", async (req, res) => {});

module.exports = router;
