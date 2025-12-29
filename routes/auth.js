const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-password', protect, changePassword);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
