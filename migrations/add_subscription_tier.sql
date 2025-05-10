-- Add subscription_tier column to customers table
ALTER TABLE customers
ADD COLUMN subscription_tier VARCHAR(50) NOT NULL DEFAULT 'free';
