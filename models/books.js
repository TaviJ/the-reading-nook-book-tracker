const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    
    genre: {
        type: String,
        required: true,
        trim: true
    },
    pages: {
        type: Number,
        required: true,
        min: 1
    },
    pagesRead: {
        type: Number,
        required: true,
        min: 0,
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;