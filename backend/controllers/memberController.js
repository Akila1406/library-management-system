const Member = require('../models/Member');

// @desc    Add member
// @route   POST /api/members
exports.addMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all members
// @route   GET /api/members
exports.getMembers = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        const members = await Member.find(query);
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single member
// @route   GET /api/members/:id
exports.getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update member details
// @route   PUT /api/members/:id
exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
exports.deleteMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
