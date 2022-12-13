const Comments = require("../model/commentModel");

const allComments = async (req, res) => {
  const comments = await Comments.getAllComments(+req.params.id);
  res.status(200).send(comments);
};

const addComment = async (req, res) => {
  const user_id = req.id;
  const {
    post_id,
    commentary
  } = req.body;
  const comments = await Comments.addComment({
    post_id,
    user_id,
    likes: 0,
    dislikes: 0,
    commentary
  });

  if (comments) {
    res.status(200).send(comments);
    
  } else {
    res.status(404).send("comment not found");
  }
};

module.exports = {
  allComments,
  addComment,
};
