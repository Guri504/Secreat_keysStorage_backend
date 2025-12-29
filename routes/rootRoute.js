const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const secretRoutes = require('./secrets');
const activityRoutes = require('./activity');

router.use('/auth', authRoutes);
router.use('/secrets', secretRoutes);
router.use('/activity', activityRoutes);

module.exports = router;
