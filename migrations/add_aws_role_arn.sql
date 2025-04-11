-- Add aws_role_arn column to clusters table
ALTER TABLE clusters ADD COLUMN IF NOT EXISTS aws_role_arn TEXT;

-- Update the valid_aws_credentials constraint to allow either access keys or role ARN
ALTER TABLE clusters DROP CONSTRAINT IF EXISTS valid_aws_credentials;
ALTER TABLE clusters ADD CONSTRAINT valid_aws_credentials CHECK (
    provider != 'aws' OR 
    (aws_access_key_id IS NOT NULL AND aws_secret_access_key IS NOT NULL) OR
    (aws_role_arn IS NOT NULL)
);
