const Posts = require("../model/PostsModel");

const allPosts = async (req, res) => {
    const postsId = req.id;
    const posts = await Posts.totalUsers(postsId);
    res.status(200).send(posts);
  };

module.exports = {
    allPosts,
  };