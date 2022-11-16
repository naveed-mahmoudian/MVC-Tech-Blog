const router = require("express").Router();
const Post = require("../../models/Post");

// Create Post
// router.post("/", async (req, res) => {
//   const currentDate = new Date();
//   const dateCreated = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${
//     currentDate.getFullYear
//   } - ${currentDate.getHours}:${currentDate.getMinutes()}`;

//   const newPost = await Post.create({
//     date_created: dateCreated,
//     title: req.body.title,
//     text: req.body.text,
//     user_id: 1,
//   });
// });

module.exports = router;
