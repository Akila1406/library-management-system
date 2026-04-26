const Book = require('../models/Book');

// @desc    Add new book
// @route   POST /api/books
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update book details
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
