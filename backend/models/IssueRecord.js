const mongoose = require('mongoose');

const issueRecordSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true,
        unique: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    fineAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Issued', 'Returned'],
        default: 'Issued'
    }
}, { timestamps: true });

module.exports = mongoose.model('IssueRecord', issueRecordSchema);
