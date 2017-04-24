#!/bin/bash
BACKUP_FILE_NAME=$1

# check with admin that they have typed file in correctly and wish to continue
echo "Attempting to restore backup file from S3: $BACKUP_FILE_NAME.gz do you want to continue? [y/n]"
read SHOULD_CONTINUE
if [ ! $SHOULD_CONTINUE = "y" ]; then
  echo "user decided not to continue"
  exit
fi

# install leftover and create /tmp/aws_install directory for new installation
rm -rf /tmp/aws && rm -rf /tmp/aws_install
mkdir /tmp/aws_install

curl https://s3.amazonaws.com/aws-cli/awscli-bundle.zip -o awscli-bundle.zip
unzip awscli-bundle.zip
chmod +x ./awscli-bundle/install
./awscli-bundle/install -i /tmp/aws

# create a backup before attempting to overwrite the current DB
bash /app/scripts/db/run-backup.sh



# create /tmp/s3-backups directory if it doesn't already exist
if [ ! -d "/tmp/s3-backups" ]; then
  mkdir -p /tmp/s3-backups
fi

# copy specified backup to /tmp/s3-backups
/tmp/aws/bin/aws s3 cp s3://$S3_BUCKET_PATH/$DB_DATABASE/$BACKUP_FILE_NAME.gz /tmp/s3-backups/$BACKUP_FILE_NAME.gz --region $AWS_DEFAULT_REGION

echo "finished downloading the dump"

# unzip backup file into the same folder
gzip -d /tmp/s3-backups/$BACKUP_FILE_NAME.gz > /tmp/s3-backups/$BACKUP_FILE_NAME

echo "finished unzipping the dump"

# run mysql with the dump file
mysql -u $DB_USER -h $DB_HOST -p$DB_PASSWORD $DB_DATABASE < /tmp/s3-backups/$BACKUP_FILE_NAME
