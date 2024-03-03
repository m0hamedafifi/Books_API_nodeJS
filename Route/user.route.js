const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");

// Get all users
router.get("/users", userController.getUserList);
// Create a new user
router.post("/users/add", userController.addUser);

// verify email user 
router.get("/users/:id", userController.verifyUser);
// // Get a specific user
// router.get("/books/detail/:bookId", bookController.getBookDetails);
// // Update an existing user
// router.put("/books/update/:bookId", bookController.updateBook);
// // Delete a user by id
// router.delete("/books/remove/:bookId", bookController.removeBookById);

module.exports = router;
