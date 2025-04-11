#!/bin/bash

# Get database connection details from environment variables or use defaults
PGHOST=${PGHOST:-localhost}
PGPORT=${PGPORT:-5432}
PGUSER=${PGUSER:-k8mpatible}
PGPASSWORD=${PGPASSWORD:-nextjs123}
PGDATABASE=${PGDATABASE:-k8mpatible}

# Check if migration file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <migration-file>"
  echo "Example: $0 migrations/add_aws_role_arn.sql"
  exit 1
fi

MIGRATION_FILE=$1

# Check if the migration file exists
if [ ! -f "$MIGRATION_FILE" ]; then
  echo "Error: Migration file '$MIGRATION_FILE' not found"
  exit 1
fi

echo "Running migration from $MIGRATION_FILE..."

# Run the migration
PGPASSWORD=$PGPASSWORD psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f $MIGRATION_FILE

if [ $? -eq 0 ]; then
  echo "Migration completed successfully"
else
  echo "Migration failed"
  exit 1
fi
