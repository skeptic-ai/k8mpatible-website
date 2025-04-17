-- Add gcp_project_id column to clusters table
ALTER TABLE clusters ADD COLUMN gcp_project_id VARCHAR(255);

-- Update the valid_gcp_credentials constraint to include the project ID
ALTER TABLE clusters DROP CONSTRAINT valid_gcp_credentials;
ALTER TABLE clusters ADD CONSTRAINT valid_gcp_credentials CHECK (
    provider != 'gcp' OR 
    (gcp_project_id IS NOT NULL)
);
