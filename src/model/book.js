const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    }
    
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
