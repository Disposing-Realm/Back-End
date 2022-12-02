const express = require("express");
const postsController = require("../controller/postsControllers.js");

const router = express.Router();

router.get("/", postsController.allPosts);

// router.get("/:id", postsController.--2);

module.exports = router;