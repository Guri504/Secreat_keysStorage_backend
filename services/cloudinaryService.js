const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'guris-gallary',
    api_key: '129543368368636',
    api_secret: 'ixdmswIbRgKq_FQb3ehggqjGHo8',
});

const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'secret_vault',
            resource_type: 'auto'
        });
        return {
            fileUrl: result.secure_url,
            publicId: result.public_id,
            // Cloudinary result doesn't explicitly guarantee mimetype in exact format always, 
            // but we can pass it from controller or let it be. 
            // For now, returning the essential cloudinary result data.
            // We can rely on the controller to pass mimetype or extract it if needed.
        };
    } catch (error) {
        throw new Error('Cloudinary upload failed: ' + error.message);
    }
};

const deleteFile = async (publicId) => {
    try {
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        throw new Error('Cloudinary delete failed: ' + error.message);
    }
};

module.exports = {
    uploadFile,
    deleteFile
};
