CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
 
  PRIMARY KEY (identifier, token)
);
 
CREATE TABLE accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
 
  PRIMARY KEY (id)
);

CREATE TABLE customers
(
    id SERIAL,  
    name VARCHAR(255),
    organization VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (id)
);
CREATE TYPE cloud_provider AS ENUM ('aws', 'gcp', 'azure');

CREATE TABLE clusters (
    id SERIAL,
    customer_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    provider cloud_provider NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- AWS specific fields
    aws_access_key_id VARCHAR(255),
    aws_secret_access_key TEXT,
    aws_role_arn TEXT,
    
    -- GCP specific fields
    gcp_service_account_key TEXT,
    
    -- Azure specific fields
    azure_tenant_id VARCHAR(255),
    azure_client_id VARCHAR(255),
    azure_client_secret TEXT,
    azure_subscription_id VARCHAR(255),
    azure_resource_group VARCHAR(255),
    
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Ensure credentials are provided based on provider
    CONSTRAINT valid_aws_credentials CHECK (
        provider != 'aws' OR 
        (aws_access_key_id IS NOT NULL AND aws_secret_access_key IS NOT NULL) OR
        (aws_role_arn IS NOT NULL)
    ),
    CONSTRAINT valid_gcp_credentials CHECK (
        provider != 'gcp' OR 
        gcp_service_account_key IS NOT NULL
    ),
    CONSTRAINT valid_azure_credentials CHECK (
        provider != 'azure' OR 
        (azure_tenant_id IS NOT NULL AND 
         azure_client_id IS NOT NULL AND 
         azure_client_secret IS NOT NULL AND 
         azure_subscription_id IS NOT NULL AND 
         azure_resource_group IS NOT NULL)
    )
);

-- Index for faster lookups by customer
CREATE INDEX idx_clusters_customer_id ON clusters(customer_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_clusters_updated_at
    BEFORE UPDATE ON clusters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
    
-- Table to store cluster scan results
CREATE TABLE scans (
    id SERIAL,
    cluster_id INTEGER NOT NULL,
    scanned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    discovered_tools JSONB NOT NULL, -- Stores the array of discovered tools and their versions
    
    PRIMARY KEY (id),
    FOREIGN KEY (cluster_id) REFERENCES clusters(id) ON DELETE CASCADE
);

-- Index for faster lookups by cluster
CREATE INDEX idx_scans_cluster_id ON scans(cluster_id);

-- Index on the JSONB column for better query performance
CREATE INDEX idx_scans_discovered_tools ON scans USING gin (discovered_tools);
-- Grant permissions on the clusters table and its sequence
GRANT USAGE, SELECT ON SEQUENCE clusters_id_seq TO k8mpatible;
GRANT ALL PRIVILEGES ON TABLE clusters TO k8mpatible;

-- Grant permissions on the customers table since clusters references it
GRANT ALL PRIVILEGES ON TABLE customers TO k8mpatible;

-- Grant permissions on the scans table and its sequence since it's related to clusters
GRANT USAGE, SELECT ON SEQUENCE scans_id_seq TO k8mpatible;
GRANT ALL PRIVILEGES ON TABLE scans TO k8mpatible;
