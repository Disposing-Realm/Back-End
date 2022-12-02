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
    allPosts,
  };
  
const Post = require('../models/postsModel')

const getallPosts = async (req, res) => {
    const postFeed = await Post.totalPost()
    return postFeed ? res.status(200).send(postFeed) : res.sendStatus(404);
}
const addPost = async (req, res) => {
    const {post_description, user_id} = req.body
    console.log(req.body)
    const format = await Post.addPostFromDB(post_description, user_id)
    return format ? res.status(200).send(format) : res.sendStatus(404);
} 
module.exports = {
    getallPosts,
    addPost
}
