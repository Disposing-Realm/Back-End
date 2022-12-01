const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const databasePool = require("../db");

const allUsers = async (req, res) => {
  const userId = req.id;
  const users = await Users.totalUsers(userId);
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  const userId = req.id;
  const user = await Users.singleUser(userId);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("user not found");
  }
};

const validateInputs = (email, password) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email.toLowerCase())) return false;
  if (password.length < 5) return false;
  return true;
};

const userRegister = async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
    } = req.body;
    if (!validateInputs(email, password)) {
      throw Error("Invalid Credentials.");
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserInfo = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    console.log(newUserInfo);
    Users.createUser(newUserInfo);
    const token = jwt.sign({ email: email }, process.env.AUTH_KEY);
    res.cookie("token", token).sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.getByEmail(email);

    if (!user) {
      return res.status(401).send("User Does Not Exist.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(user.email);

    if (isValidPassword) {
      const token = jwt.sign({ email: user.email }, process.env.AUTH_KEY);
      res.cookie("token", token).status(200).send(JSON.stringify(user));
    }
  } catch (err) {
    res.status(500).send("An error has occured");
    console.log(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};

const userDelete = async (req, res) => {
  const userId = req.id;
  const user = await Users.deleteUser(userId);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("Deletion Unsuccessful");
  }
};

const userUpdate = async (req, res) => {
  const userId = req.id;
  const { first_name, last_name } = req.body;

  const user = await Users.updateUser({
    id: userId,
    first_name,
    last_name,
  });

  if (user) {
    res.status(200).send("Information successfully updated");
  } else {
    res.status(404).send();
  }
};

module.exports = {
  allUsers,
  login,
  logout,
  getUserById,
  userRegister,
  userDelete,
  userUpdate,
};