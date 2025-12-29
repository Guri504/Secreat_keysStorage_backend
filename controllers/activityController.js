const Activity = require('../models/Activity');

// @desc    Get user activities
// @route   GET /api/activity
// @access  Private
const getActivities = async (req, res) => {
    try {
        // Sorting by createdAt in descending order (newest first)
        const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getActivities,
};
