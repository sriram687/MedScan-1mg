/**
 * Cloudinary Image Utilities
 * Handles image optimization, transformations, and CDN delivery
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME || 'sriram-cloud';

/**
 * Get optimized image URL with Cloudinary transformations
 * @param imageUrl - Original image URL
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'high' | 'low';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'thumb';
  } = {}
): string {
  if (!imageUrl) return '';

  try {
    // Already a Cloudinary optimized URL
    if (imageUrl.includes('cloudinary.com')) {
      return imageUrl;
    }

    // Default options
    const {
      width = 300,
      height = 300,
      quality = 'auto',
      format = 'auto',
      crop = 'fill'
    } = options;

    // Build transformation string
    const transformations = [
      `w_${width}`,
      `h_${height}`,
      `c_${crop}`,
      `q_${quality}`,
      `f_${format}`
    ].join(',');

    // Use Cloudinary fetch for external images
    const encodedUrl = encodeURIComponent(imageUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transformations}/${encodedUrl}`;
  } catch (error) {
    console.error('Error generating optimized URL:', error);
    return imageUrl;
  }
}

/**
 * Get thumbnail URL (small, optimized version)
 */
export function getThumbnailUrl(imageUrl: string): string {
  return getOptimizedImageUrl(imageUrl, {
    width: 150,
    height: 150,
    crop: 'fill',
    quality: 'auto'
  });
}

/**
 * Get preview URL (medium size)
 */
export function getPreviewUrl(imageUrl: string): string {
  return getOptimizedImageUrl(imageUrl, {
    width: 400,
    height: 400,
    crop: 'fit',
    quality: 'auto'
  });
}

/**
 * Get high-quality URL for detail view
 */
export function getDetailUrl(imageUrl: string): string {
  return getOptimizedImageUrl(imageUrl, {
    width: 600,
    height: 600,
    crop: 'fit',
    quality: 'high'
  });
}

/**
 * Check if URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url?.includes('cloudinary.com') || false;
}

/**
 * Get Cloudinary transformation URL manually
 * Useful for custom transformations
 */
export function getTransformedUrl(
  imageUrl: string,
  transformationString: string
): string {
  if (!imageUrl) return '';

  try {
    if (imageUrl.includes('cloudinary.com')) {
      return imageUrl;
    }

    const encodedUrl = encodeURIComponent(imageUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transformationString}/${encodedUrl}`;
  } catch (error) {
    console.error('Error in getTransformedUrl:', error);
    return imageUrl;
  }
}

/**
 * Generate placeholder color based on medicine name
 */
export function getPlaceholderColor(name: string): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}
