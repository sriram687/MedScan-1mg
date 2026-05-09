const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload image to Cloudinary from URL
 * @param {string} imageUrl - URL of the image to upload
 * @param {string} publicId - Public ID for the image (e.g., "medicines/alprazolam")
 * @returns {Promise<object>} - Cloudinary upload response
 */
async function uploadImageFromUrl(imageUrl, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
      folder: 'medscan/medicines',
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
      tags: ['medscan', 'medicine'],
      overwrite: true,
      invalidate: true
    });

    console.log(`✅ Uploaded: ${publicId} → ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`, error.message);
    return null;
  }
}

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} publicId - Public ID for the image
 * @returns {Promise<object>} - Cloudinary upload response
 */
async function uploadImageBuffer(fileBuffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        folder: 'medscan/medicines',
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        tags: ['medscan', 'medicine'],
        overwrite: true
      },
      (error, result) => {
        if (error) {
          console.error(`❌ Failed to upload ${publicId}:`, error.message);
          reject(error);
        } else {
          console.log(`✅ Uploaded: ${publicId} → ${result.secure_url}`);
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
}

/**
 * Get Cloudinary URL with transformations
 * @param {string} publicId - Public ID of the image
 * @param {object} options - Transformation options
 * @returns {string} - Optimized Cloudinary URL
 */
function getOptimizedUrl(publicId, options = {}) {
  const defaultOptions = {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
    gravity: 'auto'
  };

  const opts = { ...defaultOptions, ...options };
  
  return cloudinary.url(publicId, {
    ...opts,
    secure: true
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<object>} - Deletion result
 */
async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to delete ${publicId}:`, error.message);
    return null;
  }
}

/**
 * Batch upload multiple images
 * @param {array} images - Array of {imageUrl, publicId}
 * @returns {Promise<array>} - Array of upload results
 */
async function batchUpload(images) {
  const results = [];
  
  for (const { imageUrl, publicId } of images) {
    const result = await uploadImageFromUrl(imageUrl, publicId);
    if (result) {
      results.push(result);
    }
    // Rate limiting - wait 500ms between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return results;
}

module.exports = {
  uploadImageFromUrl,
  uploadImageBuffer,
  getOptimizedUrl,
  deleteImage,
  batchUpload,
  cloudinary
};
