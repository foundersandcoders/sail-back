#!/bin/bash

# This script requires you to copy in the production database credentials
# CLEARDB_USER
# CLEARDB_HOST
# CLEARDB_PASSWORD
# DATABASE

if [ -z "$CLEARDB_USER" ]; then
    echo "Need to set CLEARDB_USER"
    exit 1
fi
if [ -z "$CLEARDB_HOST" ]; then
    echo "Need to set CLEARDB_HOST"
    exit 1
fi
if [ -z "$CLEARDB_PASSWORD" ]; then
    echo "Need to set CLEARDB_PASSWORD"
    exit 1
fi
if [ -z "$DATABASE" ]; then
    echo "Need to set DATABASE"
    exit 1
fi

if [ "$NODE_ENV" = "heroku" ]; then
  echo "This script is designed to be run locally"
  echo "NODE_ENV is set to $NODE_ENV"
  echo "Exiting script early"
  exit 1
fi

# new backup file name
BACKUP_FILE_NAME="$(date +"%Y-%m-%d-%H-%M")-$APP-$DATABASE.sql"

# if directory '/tmp/db-backups' doesn't exist, create it
if [ ! -d "./.tmp/db-backups" ]; then
  mkdir -p ./.tmp/db-backups/
fi

# dump the current DB into /.tmp/db-backups/<new-file-name>
mysqldump -u $CLEARDB_USER -h $CLEARDB_HOST -p$CLEARDB_PASSWORD --databases $DATABASE > ./.tmp/db-backups/$BACKUP_FILE_NAME
echo "filename: $BACKUP_FILE_NAME"
echo "location: ./.tmp/db-backups/$BACKUP_FILE_NAME"

mysql -u $DB_USER -p$DB_PASSWORD < ./.tmp/db-backups/$BACKUP_FILE_NAME
echo "Dump restored to local machine, with name: $DATABASE"

echo "Do you want to open mysql locally with the copied database? [y/n]"
read OPEN_MYSQL
if [ "$OPEN_MYSQL" = "y" ]; then
  mysql -u $DB_USER -p$DB_PASSWORD $DATABASE
fi
