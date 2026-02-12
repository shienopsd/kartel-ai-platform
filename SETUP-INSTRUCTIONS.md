# Setup Instructions - Download Backend

All the code is ready! You just need to complete 3 quick manual steps:

## Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new project:
   - Project name: `kartel-marketplace` (or anything you like)
   - Database password: Choose a strong password (save it!)
   - Region: Choose closest to your users
   - Pricing plan: Free

## Step 2: Run Database Schema (1 minute)

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` (in this directory)
4. Paste it into the SQL editor
5. Click "Run" (bottom right corner)
6. You should see: "Success. No rows returned"

## Step 3: Get API Keys and Configure (1 minute)

1. In Supabase dashboard, go to "Project Settings" (gear icon bottom left)
2. Click "API" in the settings sidebar
3. You'll see two sections:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **Project API keys**:
     - Copy the `anon` `public` key
     - Copy the `service_role` `secret` key (click "Reveal" first)

4. Create a file called `.env.local` in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

5. Edit `.env.local` and paste your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

6. Restart your dev server:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## That's it! 🎉

Your download system is now fully operational with:
- ✅ GitHub Releases for file hosting
- ✅ Streaming download proxy (users stay on your domain)
- ✅ Supabase analytics tracking
- ✅ Download count prevention (localStorage)

## Test It Out

1. Go to http://localhost:3000
2. Click the "Download" button on the Adobe Premiere plugin card
3. The file should download (it's a placeholder for now)
4. Check your Supabase dashboard → Table Editor → `downloads` table
5. You should see a new download record!

## Next Steps

- Replace the placeholder plugin ZIP with your actual plugin in the GitHub release
- Add more products to `products.json`
- View download analytics in Supabase dashboard

## Troubleshooting

**Error: "Missing environment variables"**
- Make sure `.env.local` exists and has all three keys
- Restart your dev server after creating/editing `.env.local`

**Download tracking not working**
- Check the Supabase dashboard → Table Editor → `downloads` table
- Check browser console for errors
- Verify all three environment variables are set correctly

**File download fails**
- Make sure the GitHub Release URL in `products.json` is accessible
- Try opening the URL directly in your browser to verify it works
