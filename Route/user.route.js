const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");

// Get all books
router.get("/users", userController.getUserList);
// Create a new book
router.post("/users/add", userController.addUser);
// // Get a specific book
// router.get("/books/detail/:bookId", bookController.getBookDetails);
// // Update an existing book
// router.put("/books/update/:bookId", bookController.updateBook);
// // Delete a book by id
// router.delete("/books/remove/:bookId", bookController.removeBookById);

module.exports = router;
