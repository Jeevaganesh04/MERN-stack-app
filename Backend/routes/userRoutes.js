const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  deleteUsers
} = require("../Controller/userController");

router.post("/", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUsers);



module.exports = router;