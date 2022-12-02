const Comments = require("../model/commentModel");

const allComments = async (req, res) => {
    const commentId = req.id;
    const comments = await Comments.totalUsers(commentId);
    res.status(200).send(comments);
  };

  const getCommentById = async (req, res) => {
    const commentId = req.id;
    const comments = await Comments.singleComment(commentId);
  
    if (comments) {
      res.status(200).send(comments);
    } else {
      res.status(404).send("comment not found");
    }
  };

  module.exports = {
    allComments,
    getCommentById,
  };