The script `/scripts/db/local/copy-production-db-to-local.sh` will dump a copy of the production database into your ./tmp/db-backups/ folder, then add it to your local mysql database under the name matching the production database name.

In order to run the script, we need to supply the script with the production database credentials:
- CLEARDB_USER
- CLEARDB_HOST
- CLEARDB_PASSWORD
- DATABASE

These can either be sourced from another file, or run in directly in the command-line:
`CLEARDB_USER=<user> CLEARDB_HOST=<host> CLEARDB_PASSWORD=<password> DATABASE=<database name> bash ./scripts/db/local/copy-production-db-to-local.sh`
