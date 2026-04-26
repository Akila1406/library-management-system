const Book = require('../models/Book');
const Member = require('../models/Member');
const IssueRecord = require('../models/IssueRecord');

exports.getStats = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalMembers = await Member.countDocuments();
        const issuedBooks = await IssueRecord.countDocuments({ status: 'Issued' });
        const returnedBooks = await IssueRecord.countDocuments({ status: 'Returned' });

        res.json({
            totalBooks,
            totalMembers,
            issuedBooks,
            returnedBooks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
