-- Migration 004: Add is_seeded flag to track seeded test data
-- Allows distinguishing seeded submissions from real ones

ALTER TABLE assessment_submissions
  ADD COLUMN IF NOT EXISTS is_seeded BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_submissions_is_seeded
  ON assessment_submissions(is_seeded);
