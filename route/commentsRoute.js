const express = require("express");

const commentControllers = require("../controller/commentControllers");
const authenticate = require("../auth");

const router = express.Router();

router.get("/:id"/*, authenticate*/, commentControllers.allComments);

router.post("/new-comment", authenticate, commentControllers.addComment);

module.exports = router;