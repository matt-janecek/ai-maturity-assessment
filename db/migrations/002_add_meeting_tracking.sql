-- Migration: Add meeting tracking fields to assessment_submissions table
-- Run this in the Neon SQL console

-- Track when user clicks booking link (from results page)
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS booking_clicked_at TIMESTAMP;

-- Track if meeting was scheduled (manual toggle by admin)
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS meeting_scheduled_at TIMESTAMP;

-- Optional notes about the meeting
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS meeting_notes TEXT;
