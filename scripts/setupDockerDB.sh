#!/bin/bash

docker run -p 5432:5432 --name postgres-tracker -e POSTGRES_PASSWORD=tracker -d postgres:latest
