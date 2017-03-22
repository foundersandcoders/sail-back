#!/bin/bash
echo "Backup DB run, attempting to backup DB send to S3"

if [  $NODE_ENV = 'testing' ]; then
  echo "NODE_ENV is $NODE_ENV, so ending run backup early"
  exit
fi

#install aws-cli if it doesn't exist
if [ ! -d "/tmp/aws" ]; then
  curl https://s3.amazonaws.com/aws-cli/awscli-bundle.zip -o awscli-bundle.zip
  unzip awscli-bundle.zip
  chmod +x ./awscli-bundle/install
  ./awscli-bundle/install -i /tmp/aws
fi

# new backup file name
BACKUP_FILE_NAME="$(date +"%Y-%m-%d-%H-%M")-$APP-$DB_DATABASE.sql"


# if directory '/tmp/db-backups' doesn't exist, create it
if [ ! -d "/tmp/db-backups" ]; then
  mkdir -p /tmp/db-backups/
fi

# dump the current DB into /tmp/db-backups/<new-file-name>
./bin/mysqldump -u $DB_USER -h $DB_HOST -p$DB_PASSWORD --databases $DB_DATABASE | gzip -c > "/tmp/db-backups/$BACKUP_FILE_NAME.gz"

# using the aws cli, copy the new backup to our s3 bucket
/tmp/aws/bin/aws s3 cp /tmp/db-backups/$BACKUP_FILE_NAME.gz s3://$S3_BUCKET_PATH/$DB_DATABASE/$BACKUP_FILE_NAME.gz --region=$AWS_DEFAULT_REGION

echo "backup $BACKUP_FILE_NAME.gz complete"
