const express = require('express');
const router = express.Router();
const { addMember, getMembers, getMemberById, updateMember, deleteMember } = require('../controllers/memberController');

router.post('/', addMember);
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
