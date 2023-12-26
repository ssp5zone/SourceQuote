# SourceQuote

> A website to put down quotes that you read, heard, saw, thought and felt.
> Things that made to simle, laugh or tear-up. And those that just made to stare at the wall for few minutes.
>
> \- **Readme (Github.com)**

![alt text](docs/screenshot.png)

Checkout the Live site: [SourceQuote](https://drab-teal-coypu-belt.cyclic.app/).

* **Note:** The site may be down during deployment.

## Requirements

1. Node.js
2. MongoDB _(A local or remote installtion like Mongo Atlas)_

## Build

### Docker

This is the easiest way to get the project up and running.

Just download/clone this repository and run the following command in the root path of the project.

```bash
docker-compose up
```

You should now be able to access the UI here: `http://localhost:8091`.

This will start,

1. The mongo DB at port `27017`
2. The server at port `8091`
3. An additional mongo express client at port `8086` for viewing the DB.

### Traditional

After downloading/cloning this repository

1.Setup the project

  ```bash
npm install
  ```

2._(Optional)_ Start the mongo DB if using a local one.

3.Add a `.env` file in the root path with following properties

```env
DB=<Your_local_or_remote_DB_URL>
DBNAME=<Your_DB_NAME>
COLLECTION=<Your_DB_COLLECTION>
```

4.Start the server

  ```bash
npm run local
  ```

![alt text](docs/run.png)

Once started you can view the page at `http://localhost:8787`.

## Licence

MIT Licence. Free to copy, distribute and use.
