# Web Scrapping Formula F1 Site

A web scrapping project that gets data results from [Formula F1 website](https://www.formula1.com/en.html) and displays the data as REST APIs.

## Description

The project using [Nestjs](https://github.com/nestjs/nest) framework with Typescript as a backend to make REST endponints to search for data results such as, teams, drivers, races, and using MongoDB as a database for storing the search results.

You can view database from MongoDB through http://localhost:8081 with `formula1` being database's name, once you have done the instructions from [Installation](#installation) and [Running the app](#running-the-app) sections.

## Installation

```bash
# Start MongoDB and mongo-express containers
$ docker-compose up -d

# Install dependencies
$ yarn install
```

## Running the app

```bash
# Start the app on port 3000
$ yarn run start
```

## REST APIs

Below is the list of all available endpoints.

### Get race results by year

#### Request

`GET /races?year=2023`

    curl -i -H 'Accept: application/json' http://localhost:3000/races?year=2023

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 982
    ETag: W/"3d6-rc581TuNhqmc7kE0f6soelPkIUk"
    Date: Sat, 10 Jun 2023 17:06:59 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"grand_prix":"Bahrain","winner":"Max Verstappen","car":"Red Bull Racing Honda RBPT","laps":"57","time":"1:33:56.736","date":"05 Mar 2023"]
    

### Get team results by year

#### Request

`GET /teams?year=2023`

    curl -i -H 'Accept: application/json' http://localhost:3000/teams?year=2023

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 499
    ETag: W/"1f3-yZ/4QIz54k25MxmmbRqRB6hwvYo"
    Date: Sat, 10 Jun 2023 17:13:57 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"pos":"1","team":"Red Bull Racing Honda RBPT","pts":"287"}]

### Get drivers results by year

#### Request

`GET /drivers?year=2023`

    curl -i -H 'Accept: application/json' http://localhost:3000/drivers?year=2023

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 1886
    ETag: W/"75e-85lmtK3cTq0jpsbL5c5v1rSjKtk"
    Date: Sat, 10 Jun 2023 17:17:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"pos":"1","driver":"Max Verstappen","nationality":"NED","car":"Red Bull Racing Honda RBPT","pts":"170"}]
