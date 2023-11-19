const express = require('express');
const router = express.Router();
const bookController = require('../Controller/book.controller');

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the Book API' });
    });
    // Get all books
    router.get("/books", bookController.getBookList);
    // Create a new book
    router.post("/books/add", bookController.addNewBook);
    // Get a specific book
    router.get("/books/detail/:bookId", bookController.getBookDetails);
    // Update an existing book
    router.put("/books/update/:bookId", bookController.updateBook);
    // Delete a book by id
    router.delete("/books/remove/:bookId", bookController.removeBookById);


    module.exports = router;

