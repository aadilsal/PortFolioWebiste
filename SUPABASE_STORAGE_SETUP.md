# Supabase Storage Setup Guide

## Overview

Your portfolio now uses Supabase Storage for cloud-hosted images instead of local file paths. Images are automatically uploaded when you add/edit projects in the Admin panel.

## Automatic Setup

The storage bucket is automatically initialized when you log into the Admin panel for the first time. The code will:

- Create a bucket named `portfolio-images`
- Set it to public access
- Configure 5MB file size limit
- Allow image formats: PNG, JPEG, JPG, WebP, GIF

## Manual Setup (Optional)

If you prefer to set it up manually via the Supabase Dashboard:

1. **Go to Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project

2. **Create Storage Bucket**
   - Go to Storage section in the left sidebar
   - Click "New bucket"
   - Name: `portfolio-images`
   - Check "Public bucket" (allows public access to images)
   - Click "Create bucket"

3. **Configure Bucket Policies**
   - The bucket should allow public reads
   - Authenticated users (admin) should be able to upload/delete
   - This is automatically configured by the code

## How to Use

### Adding a New Project with Image

1. Go to `/admin` and log in
2. Fill in project details
3. Click "Choose File" under "Image Upload"
4. Select an image file (PNG, JPEG, WebP, or GIF, max 5MB)
5. Wait for upload to complete (you'll see a preview)
6. Click "Save Project"

The image will be:

- Uploaded to Supabase Storage
- Given a unique filename (prevents conflicts)
- Publicly accessible via a permanent URL
- Automatically deleted if you delete the project

### Image Requirements

- **Formats**: PNG, JPEG, JPG, WebP, GIF
- **Max Size**: 5MB per image
- **Recommended Size**: 800x600px or similar aspect ratio for best display

## Storage Bucket Features

### Automatic Filename Generation

Each uploaded image gets a unique filename like:

```
1704123456789-abc123.png
```

Format: `timestamp-randomString.extension`

### Public URLs

Images are accessible via public URLs like:

```
https://[your-project-id].supabase.co/storage/v1/object/public/portfolio-images/1704123456789-abc123.png
```

### Automatic Cleanup

- When you delete a project, its image is automatically removed from storage
- Prevents orphaned files and saves storage space

## Migrating Existing Projects

If you have existing projects with local image paths (like `/assets/projects/myimage.png`):

1. Go to `/admin`
2. Edit each project
3. Upload the image file using the file picker
4. Save the project

The old local path will be replaced with the Supabase Storage URL.

## Troubleshooting

### "Failed to upload image"

- Check file size (must be under 5MB)
- Verify file type (PNG, JPEG, WebP, or GIF only)
- Check browser console for detailed error

### Images not showing

- Ensure bucket is set to "Public"
- Check Supabase dashboard → Storage → portfolio-images → Policies
- Verify the image URL is correct

### Bucket already exists error

- This is fine! The code will use the existing bucket
- No action needed

## Storage Limits

**Supabase Free Tier:**

- 1GB total storage
- Unlimited bandwidth (public buckets)

To check your usage:

- Go to Supabase Dashboard → Project Settings → Usage
- Monitor storage size under "Database & Storage"

## Security

The storage bucket is configured as:

- **Public Read**: Anyone can view images (needed for portfolio display)
- **Authenticated Write**: Only logged-in admins can upload/delete
- **File Validation**: Size and type restrictions enforced

## Next Steps

1. Log into `/admin`
2. The storage bucket will initialize automatically
3. Start uploading images for your projects!
4. (Optional) Migrate existing projects to use Supabase Storage

## Questions?

- Check Supabase Storage docs: https://supabase.com/docs/guides/storage
- View your storage dashboard: https://supabase.com/dashboard/project/[your-project-id]/storage/buckets
