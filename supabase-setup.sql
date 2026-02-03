-- Run this SQL in Supabase SQL Editor to create tables

-- Projects table
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sub_description TEXT[] DEFAULT '{}',
  href TEXT,
  logo TEXT DEFAULT '',
  image TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  job TEXT NOT NULL,
  date TEXT NOT NULL,
  contents TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public read access for experiences"
  ON experiences FOR SELECT
  USING (true);

-- Create policies to allow insert/update/delete (you can add authentication later)
CREATE POLICY "Public insert access for projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access for projects"
  ON projects FOR UPDATE
  USING (true);

CREATE POLICY "Public delete access for projects"
  ON projects FOR DELETE
  USING (true);

CREATE POLICY "Public insert access for experiences"
  ON experiences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access for experiences"
  ON experiences FOR UPDATE
  USING (true);

CREATE POLICY "Public delete access for experiences"
  ON experiences FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_experiences_created_at ON experiences(created_at DESC);
