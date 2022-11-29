const express = require("express");
const userController = require("../controller/userController");
const authenticate = require("../auth");
const router = express.Router();

router.get("/", userController.allUsers);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.get("/getById", authenticate, userController.getUserById);
router.post("/", userController.userRegister);
// router.delete("/:id", authenticate, userController.deleteUser);
router.put("/", authenticate, userController.userUpdate);

router.all("*", (req, res) => {
  res.send("This user route does not exist");
});

module.exports = router;