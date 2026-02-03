import { supabase } from './supabase';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (default: 'images')
 * @returns {Promise<string>} The public URL of the uploaded image
 */
export const uploadImage = async (file, bucket = 'portfolio-images') => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} imageUrl - The public URL of the image to delete
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<boolean>} Success status
 */
export const deleteImage = async (imageUrl, bucket = 'portfolio-images') => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
};

/**
 * Initialize the storage bucket (run this once)
 */
export const initializeStorageBucket = async () => {
  try {
    // Create bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    
    const bucketExists = buckets?.some(bucket => bucket.name === 'portfolio-images');
    
    if (!bucketExists) {
      const { data, error } = await supabase.storage.createBucket('portfolio-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      });

      if (error) {
        console.error('Error creating bucket:', error);
        return false;
      }

      console.log('Storage bucket created successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Bucket initialization failed:', error);
    return false;
  }
};
