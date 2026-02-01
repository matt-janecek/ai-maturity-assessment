-- Migration: Add tracking fields to assessment_submissions table
-- Run this in the Neon SQL console to add new columns

-- Add new contact fields
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS company_size VARCHAR(50);

-- Add tracking fields
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS region VARCHAR(100);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS referrer_url TEXT;
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS utm_term VARCHAR(255);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255);
ALTER TABLE assessment_submissions ADD COLUMN IF NOT EXISTS time_to_complete_seconds INTEGER;

-- Add index for utm_source for marketing analytics
CREATE INDEX IF NOT EXISTS idx_submissions_utm_source ON assessment_submissions(utm_source);
CREATE INDEX IF NOT EXISTS idx_submissions_country ON assessment_submissions(country);
