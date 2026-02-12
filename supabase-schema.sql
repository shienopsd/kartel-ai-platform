-- Supabase Database Schema for Download Analytics
-- Run this in your Supabase SQL Editor

-- Downloads table for analytics
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_downloads_product_id ON downloads(product_id);
CREATE INDEX idx_downloads_downloaded_at ON downloads(downloaded_at);

-- Enable Row Level Security (RLS)
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to download counts
CREATE POLICY "Allow public read access" ON downloads
  FOR SELECT USING (true);

-- Allow anyone to insert download records
CREATE POLICY "Allow insert for all" ON downloads
  FOR INSERT WITH CHECK (true);
