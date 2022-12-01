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