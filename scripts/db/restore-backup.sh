# source ./local.env
BACKUP_FILE_NAME=$1

# check with admin that they have typed file in correctly and wish to continue
echo "Attempting to restore backup file from S3: $BACKUP_FILE_NAME.gz do you want to continue? [y/n]"
read SHOULD_CONTINUE
if [ ! $SHOULD_CONTINUE = y ]; then
  echo "user decided not to continue"
  exit
fi

#install aws-cli if it doesn't exist
if [ ! -d "/tmp/aws" ]; then
  curl https://s3.amazonaws.com/aws-cli/awscli-bundle.zip -o awscli-bundle.zip
  unzip awscli-bundle.zip
  chmod +x ./awscli-bundle/install
  ./awscli-bundle/install -i /tmp/aws
fi

# create a backup before attempting to overwrite the current DB



# create /tmp/s3-backups directory if it doesn't already exist
if [ ! -d "/tmp/s3-backups" ]; then
  mkdir -p /tmp/s3-backups
fi

# copy specified backup to /tmp/s3-backups
/tmp/aws/bin/aws s3 cp s3://$S3_BUCKET_PATH/$DB_DATABASE/$BACKUP_FILE_NAME.gz /tmp/s3-backups/$BACKUP_FILE_NAME.gz --region $AWS_DEFAULT_REGION

echo "finished downloading the dump:"
echo $(cat /tmp/s3-backups/$BACKUP_FILE_NAME.gz)

# unzip backup file into the same folder
gzip -d /tmp/s3-backups/$BACKUP_FILE_NAME.gz > /tmp/s3-backups/$BACKUP_FILE_NAME

echo "finished unzipping the dump:"
echo $(cat /tmp/s3-backups/$BACKUP_FILE_NAME)

# run mysql with the dump file
mysql -u $DB_USER -p$DB_USER -h $DB_HOST $DB_DATABASE < /tmp/s3-backups/$BACKUP_FILE_NAME
