const router = require("express").Router();

const posts = [
  {
    id: 1,
    date_created: "11/15/22",
    title: "My First Post",
    text: "This is my first post...WOW!",
    username: "nav",
  },
  {
    id: 2,
    date_created: "11/16/22",
    title: "My Second Post",
    text: "This is my second post here!",
    username: "nav",
  },
];

// Homepage
router.get("/", async (req, res) => {
  res.render("home", { posts, loggedIn: req.session.loggedIn });
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

module.exports = router;
