const express = require("express");
const postsController = require("../controller/postsControllers.js");

const router = express.Router();

router.get("/feed", postsController.getAllPosts);

router.get("/feed/:id", postsController.getPost);

router.post("/feed", postsController.createPost);

module.exports = router; 