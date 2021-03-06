# Copying live database to local machine

_________________________________________
### Delete any files in .tmp/db-backups after you have dumped the data into your local database.
### Drop the database when you are finished using the data
### Do not run the app with the mailgun api key when using live data
_________________________________________
The script `/scripts/db/local/copy-production-db-to-local.sh` will dump a copy of the production database into your `./.tmp/db-backups/` folder, then add it to your local mysql database under the name matching the production database name.

In order to run the script, we need to supply the script with the production database credentials:
- CLEARDB_USER
- CLEARDB_HOST
- CLEARDB_PASSWORD
- DATABASE

These can either be sourced from another file, or run in directly in the command-line:
`CLEARDB_USER=<user> CLEARDB_HOST=<host> CLEARDB_PASSWORD=<password> DATABASE=<database name> bash ./scripts/db/local/copy-production-db-to-local.sh`


### Running the app locally with copied database
In order to run the app locally, we need to change the database that the app looks at, inside `/config/env/development.js` the database to be used is `process.env.DATABASE || 'foch_testing'` so you can set the database when you run the app locally with the command:
`$ DATABASE=heroku_xxxxxxxxx npm run dev`
