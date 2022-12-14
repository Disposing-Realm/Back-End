const Post = require('../model/postsModel.js')

const getAllPosts = async (req, res) => {
  const posts = await Post.totalPost();
  res.status(200).send(posts);
};


const getPost = async (req, res) => {
  const post = await Post.singlePost(req.body.id);
  res.status(200).send(post); 
};

const createPost = async (req, res) => {
  
  if (!req.body) {
    return res.status(400).send("Info not found in request")
  }
 
  if (!req.body.post_description) {
    return res.status(400).send("Description not found in request")
  }

  if (!req.body.post_image) {
    return res.status(400).send("Image not found in request")
  }
 
  let jsonResponse = await Post.createPostModel(req.body);
  return res.status(200).json(jsonResponse)/*.send("Post created successfully")*/
}
 
 
const addPost = async (req, res) => {
  const { post_description, user_id } = req.body
  console.log(req.body)
  const format = await Post.addPostFromDB(post_description, user_id)
  return format ? res.status(200).send(format) : res.sendStatus(404);
}


module.exports = {
  getAllPosts,
  getPost,
  createPost,
  addPost
}
  