const express = require('express');
const router = express.Router();
const { issueBook, getIssues, returnBook, getIssuesByMember, getIssuesByBook } = require('../controllers/issueController');

router.post('/', issueBook);
router.get('/', getIssues);
router.put('/return/:id', returnBook);
router.get('/member/:memberId', getIssuesByMember);
router.get('/book/:bookId', getIssuesByBook);

module.exports = router;
