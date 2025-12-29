const express = require('express');
const router = express.Router();
const { getSecrets, createSecret, updateSecret, deleteSecret } = require('../controllers/secretController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSecrets).post(protect, createSecret);
router.route('/:id').put(protect, updateSecret).delete(protect, deleteSecret);

module.exports = router;
