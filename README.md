# Express API for Strongman Tracker

API uses Express, Typescript, Knex

***The following steps assume the dev machine is an Apple Silicon Mac***

If that is *not* the case, qemu can be used to emulate ARM64, and minikube can be used in place of Docker Desktop.

## Running Locally

### TS Node

1. `yarn` to install dependencies
2. `yarn dev` to run on `localhost:8080`

### Docker Desktop K8s

#### Starting Up
1. Make sure Docker Desktop is running, including K8s
2. `yarn kubelocal:start` does everything necessary to deploy the app in docker-desktop-k8s
    1. Builds placing output in `./out`
    2. Builds the docker image
    3. Creates the deployment
    4. Opens the running service at `localhost:32324`

#### Shutting Down
1. `yarn kubelocal:stop` deletes the deployment

## Releasing/Deploying

1. Commit the ready-to-be-released code to `develop`
2. Run `yarn version` to:
    1. Update `version` in package.json
    2. Push to `develop` with git tag
    3. Build, tag and push the docker image to Docker Hub
    4. Rollout deployment on cluster
