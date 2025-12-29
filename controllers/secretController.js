const Secret = require('../models/Secret');
const { uploadFile, deleteFile } = require('../services/cloudinaryService');

// @desc    Get all secrets for a user
// @route   GET /api/secrets
// @access  Private
const getSecrets = async (req, res) => {
    try {
        const secrets = await Secret.find({ user: req.user._id });
        res.json(secrets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a secret
// @route   POST /api/secrets
// @access  Private
const createSecret = async (req, res) => {
    const { title, value, type, description } = req.body;

    if (!title || !value) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    let fileData = {};
    if (req.files && req.files.file) {
        try {
            const file = req.files.file;
            const result = await uploadFile(file.tempFilePath);
            fileData = {
                fileUrl: result.fileUrl,
                publicId: result.publicId,
                mimeType: file.mimetype
            };
        } catch (error) {
            console.error('File upload error:', error);
            // tailored choice: return error if upload service fails
            return res.status(500).json({ message: 'File upload failed' });
        }
    }

    try {
        const secret = new Secret({
            user: req.user._id,
            title,
            value,
            type,
            description,
            ...fileData
        });

        const createdSecret = await secret.save();
        res.status(201).json(createdSecret);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a secret
// @route   PUT /api/secrets/:id
// @access  Private
const updateSecret = async (req, res) => {
    const { title, value, type, description } = req.body;

    try {
        const secret = await Secret.findById(req.params.id);

        if (!secret) {
            return res.status(404).json({ message: 'Secret not found' });
        }

        // Make sure user owns secret
        if (secret.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        let fileData = {};
        if (req.files && req.files.file) {
            // Delete old file if exists
            if (secret.publicId) {
                await deleteFile(secret.publicId);
            }
            // Upload new file
            const file = req.files.file;
            const result = await uploadFile(file.tempFilePath);
            fileData = {
                fileUrl: result.fileUrl,
                publicId: result.publicId,
                mimeType: file.mimetype
            };
        }

        secret.title = title || secret.title;
        secret.value = value || secret.value;
        secret.type = type || secret.type;
        secret.description = description || secret.description;
        if (fileData.fileUrl) {
            secret.fileUrl = fileData.fileUrl;
            secret.publicId = fileData.publicId;
            secret.mimeType = fileData.mimeType;
        }

        const updatedSecret = await secret.save();
        res.json(updatedSecret);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a secret
// @route   DELETE /api/secrets/:id
// @access  Private
const deleteSecret = async (req, res) => {
    try {
        const secret = await Secret.findById(req.params.id);

        if (!secret) {
            return res.status(404).json({ message: 'Secret not found' });
        }

        // Make sure user owns secret
        if (secret.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        if (secret.publicId) {
            await deleteFile(secret.publicId);
        }

        await secret.deleteOne();
        res.json({ message: 'Secret removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSecrets,
    createSecret,
    updateSecret,
    deleteSecret,
};
