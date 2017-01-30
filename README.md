# Dummy Node Project

## Introduction

This is a dummy project that gives a quick setup that includes:

- NodeJS v6
- SASS
- MySQL
- Mocha (test framework)
- JavaScript linting & code coverage
- CircleCI setup

## Installation

### Docker

The project is built to run inside Docker images. To get setup locally you'll need to install Docker, using one of the links below.

#### Mac OS Image
```
https://download.docker.com/mac/stable/Docker.dmg
```

#### Windows Installer
```
https://download.docker.com/win/stable/InstallDocker.msi
```

#### Linux Options
```
http://docs.docker.com/engine/installation/linux/
```

## Development

### Docker Containers

To work on project locally you can use a docker container running NodeJS v6. There is also a 2nd container running mysql, that will serve up the data.

#### Setting Up The Containers

To begin using these containers you first need to build the images.

```
# Build both Node and MySQL docker images
docker-compose build
```

If you have previously run a build then many dependencies will cache. If you want to negate the cache you can use the flag `--no-cache`.

#### Running The Containers

On first run the MySQL container will import all the SQL dumps in `mysql/`, so it is recommended to run this on it's own first.

```
# Run only MySQL container to import database
docker-compose up db
```

After this you can run both together.

```
# Run the docker containers
docker-compose up
```

To make requests use `http://localhost:8080` as the host.

### Removing The Containers

Should you need to start afresh you can remove all containers using the following command.

```
# Remove all containers
docker-compose down
```

#### Running Commands On The Containers

Using `docker ps` you can find the container name.

```
docker ps

CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                  NAMES
e87f92d946d1        wearekick/dummy-node-project   "npm run start:dev"      7 minutes ago       Up 7 minutes        0.0.0.0:8080->80/tcp   dummy-node-project
7ef7d109abb0        mysql:5.6                      "docker-entrypoint..."   7 minutes ago       Up 7 minutes        3306/tcp               dummynodeproject_db_1
```

To run commands on the container whilst it is running you can use `docker exec`.

```
# Gain access to container and keep it open (type exit to close)
docker exec -it dummy-node-project bash

# Gain access to container and run a single command
docker exec dummy-node-project echo "Hello"
```

If the container isn't running you can still run a single command.

```
# Start container, gain access and run a single command
docker run wearekick/dummy-node-project echo "Hello"
```

### Code Quality

All tests are written using `mocha`, `sinon` and `chai`. You can run the entire suite or just the unit tests. To run these commands you will need shell access, see above.

```
# Run all tests
npm test

# Run only unit tests
npm run test:unit
```

Code coverage uses `istanbul` and can be run along with the tests.

```
# Run all tests and check coverage
npm run coverage

# Run all tests, check coverage and view detailed report in a browser
npm run coverage:html
```

All code is written using [JavaScript Standard Style](http://standardjs.com/rules.html). To check for any issues you can run linting.

```
# Check all js files
npm run lint
```
