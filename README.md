# SourceQuote

## Requirements

1. Node.js
2. MySQL

## Build

For the first download/clone of this repo,

1.Setup the project
  ```bash
npm install
  ```
2.Load the DB 
  ```bash
mysql -u root -p [root_password] xnode < doc/sql_dump/dump.sql
  ```
3.Start the server
  ```bash
node index.js
  ```

Once started you can view the page at `http://localhost:8787`.

## Licence

Copy-Left Licence.
Free to copy, distribute and use.
