const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    totalCopies: {
        type: Number,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Out of Stock'],
        default: 'Available'
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
