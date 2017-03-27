### When and how Backups are made
Backups are stored on ClearDB automatically for the last 5 days. They can be accessed through heroku.
Backups are sent to S3 daily at 3am and after any redeployment of the application. This is handled by the Heroku add-on: Heroku Scheduler.

### Restoring DB from a Backup on AWS S3

- Sign into AWS and find an appropriate looking backup file by checking the date in the file name
- You can download the dump file to inspect it locally if you like, it will not be viewable on the AWS website
- Copy the file name that you want to restore to, minus the `.gz` at the end of the file name
- for example, if the file name is: `2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql.gz` then we should copy `2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql`
- Next we need to run our restore script from the heroku shell:


```sh
heroku run bash
Running bash on ⬢ foch... up, run.4115 (Hobby)
~ $
```

Now run the backup script with the file that we want to restore from as the first argument. **Notice the filename does not contain the `.gz` at the end**

```sh
~ $ bash /app/scripts/db/restore-backup.sh 2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql
Attempting to restore backup file from S3: 2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql.gz do you want to continue? [y/n]
```
If the filename looks right, then type `y`

```sh
y
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 8423k  100 8423k    0     0  5306k      0  0:00:01  0:00:01 --:--:-- 5308k
Archive:  awscli-bundle.zip
replace awscli-bundle/install? [y]es, [n]o, [A]ll, [N]one, [r]ename:
```

This line suggests the aws CLI is already installed, so we can type `N`

```sh
replace awscli-bundle/install? [y]es, [n]o, [A]ll, [N]one, [r]ename: N
Running cmd: /usr/bin/python virtualenv.py --python /usr/bin/python /tmp/aws
Running cmd: /tmp/aws/bin/pip install --no-index --find-links file:///app/awscli-bundle/packages awscli-1.11.63.tar.gz
You can now run: /tmp/aws/bin/aws --version
download: s3://our_bucket_name/heroku_xxxxxxxxxxx9/2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql.gz to ../tmp/s3-backups/2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql.gz
finished downloading the dump:
...
```

```sh
gzip: /tmp/s3-backups/2017-03-21-14-10-foch-heroku_xxxxxxxxxxx9.sql already exists; do you wish to overwrite (y or n)?
```
type `y`

```sh
finished unzipping the dump:
...
```

```sh
-- Dump completed on 2017-03-21 14:10:20
```

The last line indicates a successful restore. Any error will be shown instead of this line.
