# Supabase Database Setup Guide

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (it's FREE!)
3. Create a new project:
   - Project name: `portfolio` (or any name you like)
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to you
   - Pricing Plan: **Free** tier
4. Wait 1-2 minutes for project to be created

## Step 2: Create Database Tables

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the entire contents of `supabase-setup.sql` file
4. Paste into the SQL editor
5. Click "Run" to execute
6. You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. In Supabase dashboard, click "Settings" (gear icon) in left sidebar
2. Click "API" under Project Settings
3. You'll see two important values:
   - **Project URL** - Copy this
   - **anon/public key** - Copy this (under "Project API keys")

## Step 4: Add Environment Variables Locally

1. Create a `.env` file in your project root:

   ```bash
   # Create .env file
   touch .env
   ```

2. Add your Supabase credentials to `.env`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Make sure `.env` is in your `.gitignore` (it should be by default)

## Step 5: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: [vercel.com](https://vercel.com)
2. Select your portfolio project
3. Click "Settings" tab
4. Click "Environment Variables" in left sidebar
5. Add two variables:
   - **Name**: `VITE_SUPABASE_URL`
     **Value**: Your Project URL from Step 3
   - **Name**: `VITE_SUPABASE_ANON_KEY`
     **Value**: Your anon key from Step 3
6. Click "Save"
7. Redeploy your project (Vercel → Deployments → Click "..." → Redeploy)

## Step 6: Test Locally

1. Restart your development server:

   ```bash
   npm run dev
   ```

2. Go to `http://localhost:5174/admin`
3. Try adding a project or experience
4. Check if it appears on your portfolio homepage
5. Go to Supabase → Table Editor → You should see your data!

## Step 7: Test on Vercel

1. After redeploying with environment variables, visit your live site
2. Go to `/admin` route
3. Add a test entry
4. Check if it appears on the live portfolio

## Troubleshooting

### "Error loading data from database"

- Check if environment variables are set correctly
- Make sure you ran the SQL setup script
- Check browser console for detailed errors

### "Error saving project"

- Make sure Row Level Security (RLS) policies are created
- Check Supabase logs: Dashboard → Logs → Postgres Logs

### Data not appearing

- Check if the API keys are correct
- Verify tables were created: Supabase → Table Editor
- Check browser Network tab for API errors

## Database Structure

**Projects Table:**

- id (auto-generated)
- title, description, href, image
- sub_description (text array)
- tags (JSON array)
- created_at, updated_at

**Experiences Table:**

- id (auto-generated)
- title, job, date
- contents (text array)
- created_at, updated_at

## Free Tier Limits

Supabase Free Tier includes:

- ✅ 500 MB database space
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**This is more than enough for a portfolio website!**

## Security Notes

- Never commit `.env` file to Git
- The `anon` key is safe to use client-side
- RLS policies control who can read/write data
- Current setup allows public read/write (fine for admin-only site)
- For production, consider adding authentication

## Next Steps (Optional)

1. **Add Authentication**: Protect `/admin` route with Supabase Auth
2. **Image Uploads**: Use Supabase Storage for project images
3. **Real-time Updates**: Use Supabase realtime subscriptions
4. **Backups**: Export database regularly via Supabase dashboard

## Support

- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)

---

**You're all set! 🎉**
