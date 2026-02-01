-- AI Maturity Assessment Database Schema
-- Run this in the Neon SQL console to set up the database

-- Assessment submissions table
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  title VARCHAR(255),
  industry VARCHAR(100),
  overall_score DECIMAL(5,2) NOT NULL,
  maturity_level INTEGER NOT NULL,
  maturity_name VARCHAR(50) NOT NULL,
  dimension_scores JSONB NOT NULL,
  industry_percentile INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON assessment_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_industry ON assessment_submissions(industry);
CREATE INDEX IF NOT EXISTS idx_submissions_company ON assessment_submissions(company);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON assessment_submissions(email);

-- Example dimension_scores JSONB structure:
-- [
--   {"dimension": "Governance & Risk", "score": 2.5, "questionsAnswered": 2},
--   {"dimension": "Developer Enablement", "score": 3.0, "questionsAnswered": 2},
--   {"dimension": "Human Oversight", "score": 2.0, "questionsAnswered": 2},
--   {"dimension": "Workflow Integration", "score": 2.5, "questionsAnswered": 2},
--   {"dimension": "Platform & Architecture", "score": 3.0, "questionsAnswered": 2},
--   {"dimension": "Value Measurement", "score": 2.0, "questionsAnswered": 2},
--   {"dimension": "Data & Model Lifecycle", "score": 2.5, "questionsAnswered": 2}
-- ]
