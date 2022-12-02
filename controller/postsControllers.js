const Post = require("../model/PostsModel");

const getAllPosts = async (req, res) => {
  const posts = await Post.totalPost();
  res.status(200).send(posts);
};

const getPost = async (req, res) => {
  const post = await Post.singlePost(req.id);
  res.status(200).send(post);
};

const createPost = async (req, res) => {
  if(!req.info){
    res.status(400).send("Info not found in request")
  }

  if(!req.info.post_description){
    res.status(400).send("Description not found in request")
  }

  if(!req.info.post_image){
    res.status(400).send("Image not found in request")
  }

  await Post.createPost(req.info);
  res.status(200).send("Post created successfully")
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
};
