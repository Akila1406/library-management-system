const IssueRecord = require('../models/IssueRecord');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Issue a book
// @route   POST /api/issues
exports.issueBook = async (req, res) => {
    try {
        const { bookId, memberId, dueDate, issueId } = req.body;

        // 1. Check book availability
        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book not available for issue' });
        }

        // 2. Check member status
        const member = await Member.findById(memberId);
        if (!member || member.status !== 'Active') {
            return res.status(400).json({ message: 'Member is inactive or not found' });
        }

        // 3. Create issue record
        const issueRecord = await IssueRecord.create({
            issueId,
            book: bookId,
            member: memberId,
            dueDate,
            status: 'Issued'
        });

        // 4. Reduce book count
        book.availableCopies -= 1;
        if (book.availableCopies === 0) {
            book.status = 'Out of Stock';
        }
        await book.save();

        res.status(201).json(issueRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all issue records
// @route   GET /api/issues
exports.getIssues = async (req, res) => {
    try {
        const issues = await IssueRecord.find()
            .populate('book', 'title bookId')
            .populate('member', 'name memberId');
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Return a book
// @route   PUT /api/issues/return/:id
exports.returnBook = async (req, res) => {
    try {
        const issueRecord = await IssueRecord.findById(req.params.id);
        if (!issueRecord) return res.status(404).json({ message: 'Record not found' });
        if (issueRecord.status === 'Returned') return res.status(400).json({ message: 'Book already returned' });

        const { returnDate } = req.body;
        const retDate = new Date(returnDate);
        const dueDate = new Date(issueRecord.dueDate);
        
        // Validation: Return date should not be before issue date
        if (retDate < new Date(issueRecord.issueDate)) {
            return res.status(400).json({ message: 'Return date cannot be before issue date' });
        }

        // Calculate fine (e.g., $10 per day after due date)
        let fine = 0;
        if (retDate > dueDate) {
            const diffTime = Math.abs(retDate - dueDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            fine = diffDays * 10; // Fine amount 10 per day
        }

        // Update record
        issueRecord.returnDate = retDate;
        issueRecord.fineAmount = fine;
        issueRecord.status = 'Returned';
        await issueRecord.save();

        // Increase book count
        const book = await Book.findById(issueRecord.book);
        if (book) {
            book.availableCopies += 1;
            book.status = 'Available';
            await book.save();
        }

        res.status(200).json(issueRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get issues by member
// @route   GET /api/issues/member/:memberId
exports.getIssuesByMember = async (req, res) => {
    try {
        const issues = await IssueRecord.find({ member: req.params.memberId }).populate('book');
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get issues by book
// @route   GET /api/issues/book/:bookId
exports.getIssuesByBook = async (req, res) => {
    try {
        const issues = await IssueRecord.find({ book: req.params.bookId }).populate('member');
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
