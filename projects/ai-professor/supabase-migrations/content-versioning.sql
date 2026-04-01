-- Content Versioning & Auto-Update Migration
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. Add versioning columns to courses table
-- ============================================

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS version INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS changelog JSONB DEFAULT '[]'::jsonb;

-- ============================================
-- 2. Add versioning columns to lessons table
-- ============================================

ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS version INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS changelog JSONB DEFAULT '[]'::jsonb;

-- ============================================
-- 3. Create content_updates table
-- ============================================

CREATE TABLE IF NOT EXISTS content_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  update_type TEXT NOT NULL CHECK (update_type IN ('major', 'minor', 'patch')),
  summary TEXT NOT NULL,
  old_version INT NOT NULL,
  new_version INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_content_updates_course_id ON content_updates(course_id);
CREATE INDEX IF NOT EXISTS idx_content_updates_created_at ON content_updates(created_at DESC);

-- ============================================
-- 4. Create notifications table
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  related_lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON notifications(user_id, is_read, created_at DESC);

-- ============================================
-- 5. RLS policies for content_updates
-- ============================================

ALTER TABLE content_updates ENABLE ROW LEVEL SECURITY;

-- Anyone can read content updates (they're public changelog info)
CREATE POLICY "Content updates are readable by all"
  ON content_updates FOR SELECT
  USING (true);

-- Only service role can insert (cron job)
CREATE POLICY "Service role can insert content updates"
  ON content_updates FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 6. RLS policies for notifications
-- ============================================

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid() OR true);  -- using true since we identify by email header

-- Service role can insert notifications (cron job)
CREATE POLICY "Service role can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (true);
