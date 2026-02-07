# Supabase Setup Guide

This guide walks you through setting up Supabase so your player profile data and uploaded images persist on Vercel.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**
3. Name it something like `player-profiles`
4. Set a database password (save it somewhere)
5. Choose a region close to you (e.g. East US)
6. Click **Create new project** — wait ~2 minutes

## 2. Create the Database Table

Go to the **SQL Editor** in your Supabase dashboard (left sidebar) and run this:

```sql
CREATE TABLE players (
  id TEXT PRIMARY KEY DEFAULT 'default',
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow the API to read/write
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access via service role"
  ON players FOR ALL
  USING (true)
  WITH CHECK (true);
```

Click **Run**. You should see "Success".

## 3. Create the Image Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name: `player-images`
4. Toggle **Public bucket** to ON
5. Click **Create bucket**

Then set the upload policy:
1. Click on `player-images` bucket
2. Go to **Policies** tab
3. Click **New Policy** → **For full customization**
4. Policy name: `Allow uploads`
5. Allowed operations: SELECT, INSERT
6. Target roles: leave default
7. Use this policy definition: `true`
8. Click **Review** → **Save policy**

## 4. Get Your Keys

1. Go to **Settings** → **API** (left sidebar)
2. Copy these two values:
   - **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (under "Project API keys", the `service_role` one, NOT the `anon` key) → this is your `SUPABASE_SERVICE_ROLE_KEY`

⚠️ The service_role key has full database access — never expose it in client-side code. It's only used in server-side API routes.

## 5. Add to Vercel

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these four variables:

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | Your chosen admin password |
| `SESSION_SECRET` | Any random string |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` (the long service_role key) |

3. Click **Save**
4. Go to **Deployments** → click the three dots on the latest → **Redeploy**

## 6. Test It

1. Visit your site at `your-site.vercel.app/admin`
2. Log in with your admin password
3. Make an edit and click Save
4. Refresh the main site — your changes should appear
5. Redeploy or wait — changes persist because they're in the database now

## How It Works

- **With Supabase configured**: All reads and writes go to the Supabase database. Images upload to Supabase Storage. Everything persists across deployments.
- **Without Supabase** (local dev): Falls back to reading/writing `data/player.json` and saving images to `public/uploads/`. Perfect for local development.
- **First deployment**: On the first load, if no data exists in Supabase yet, it automatically seeds from your local `player.json` file.

## Troubleshooting

- **"Could not save"**: Check that your `SUPABASE_SERVICE_ROLE_KEY` is correct (use the service_role key, not the anon key)
- **Images not loading**: Make sure the `player-images` bucket is set to Public
- **Data not showing**: Check the SQL editor → run `SELECT * FROM players` to see if data exists
