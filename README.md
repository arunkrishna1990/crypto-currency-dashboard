## Getting Started

### Clone and Install
First you will need to clone the repo; then you can install the necessary NPM packages and run the app.

```bash
# Clone the repo and enter it
$ git clone https://github.com/arunkrishna1990/crypto-currency-dashboard.git
$ cd crypto-currency-dashboard

# Install root dependencies
$ cd server/ npm i

# Install ui dependencies
$ cd crypto-ui/ npm i
```

### Start demo

Before starting the server `process.env.API_URL`,`process.env.API_KEY` and `process.env.DB` should be set. (I added a new .env file.)
#### Start server
```bash
$ cd server/ npm start (This will start the db and server)
```
#### Start UI
```bash
$ cd crypto-ui/ npm start (This will start the ui)
```

### Run tests
#### Server Tests
Make sure you have a docker postgres instance as there are DAO tests which needs postgres instance. Each time when a DAO or integration test runs it will spin up a new test db and drop the test db after that suite is finished running.
```bash
$ cd server/ npm test
```
#### UI Tests
```bash
$ cd crypto-ui/ npm test
```