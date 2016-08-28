# SourceQuote

## Requirements

1. Node.js
2. MySQL

## Build

For the first download/clone of this repo,

1. Run
  ```bash
  npm install
  ```
2. Initialize the DB structure by going to `doc/sql_dump/` path and running,
  ```bash
  mysql -u root -p [root_password] xnode > dump.sql
  ```
3. Once finished start the server as,
  ```bash
  node index.js
  ```

Once started you can see the app at `localhost:8787`.

## Licence

Copy-Left Licence.
Free to copy, distribute and use.
