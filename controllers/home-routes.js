const { User, Post, Comment } = require("../models");

const router = require("express").Router();

// Homepage
router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: User, attributes: ["id", "username"] }],
  });

  const posts = postData.map((post) => post.get({ plain: true }));

  res.render("home", { loggedIn: req.session.loggedIn, posts });
});

// Load login from homepage
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Load signup from login page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Dashboard
router.get("/dashboard", async (req, res) => {
  if (req.session.loggedIn) {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["id", "username"] }],
    });

    const userPosts = postData.map((post) => post.get({ plain: true }));
    const posts = userPosts.reverse();

    res.render("dashboard", { loggedIn: req.session.loggedIn, posts });
    return;
  }
  res.redirect("/login");
});

module.exports = router;
