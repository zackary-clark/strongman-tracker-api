# Express API for Strongman Tracker

API uses Express, Typescript, Knex

## Running Locally

### TS Node

1. Stop `latest-api` docker container, if it's running.
2. `npm install` to install dependencies
3. `npm run dev` to run on `localhost:8082`

### Docker Compose

2. `docker-compose up -d` to spin up PostgreSQL and Latest API

## Releasing/Deploying

1. Commit the ready-to-be-released code to `develop`
2. Run `npm version` to:
    1. Update `version` in package.json
    2. Push to `develop` with git tag
    3. Build, tag and push the docker image to Docker Hub and Artifact Registry
    4. Deploy new version to gcloud
