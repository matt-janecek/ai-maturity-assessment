-- Assessment settings table (single-row, JSONB settings)
-- Stores admin-configurable settings like industry step toggle and disabled industries

CREATE TABLE IF NOT EXISTS assessment_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{"industryStepEnabled": true, "disabledIndustries": []}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings row
INSERT INTO assessment_settings (id, settings)
VALUES (1, '{"industryStepEnabled": true, "disabledIndustries": []}'::jsonb)
ON CONFLICT (id) DO NOTHING;
