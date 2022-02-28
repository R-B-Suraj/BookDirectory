const express = require('express');
const router = new express.Router();

// authentication middleware
const authenticate = require('../middleware/authentication');
const controller = require('./routeController/book');


// open routes

router.get('/books', controller.getBooks);
router.get('/books/:id', controller.getBookById);



// secured routes

router.post('/add', authenticate, controller.addBook);
router.put('/modify/:id', authenticate, controller.updateBookById);
router.delete('/books/:id', authenticate, controller.deleteBook);


module.exports = router;