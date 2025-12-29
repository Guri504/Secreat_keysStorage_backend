const mongoose = require('mongoose');

const SecretSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String, // In a real app, this should be encrypted
        required: true,
    },
    type: {
        type: String, // 'password', 'key', 'file', 'other'
        default: 'other',
    },
    description: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    publicId: {
        type: String,
    },
    mimeType: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Secret', SecretSchema);
