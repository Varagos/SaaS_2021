<p align="center">
 <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a2/91/84/a29184a9-96a7-a793-c168-edb7ca05af75/contsched.rtpylhiv.png/1200x630wa.png" width="320" alt="Nest Logo" /></a>
</p>



## Description

Authenticator component for microservices architecture. Using postgreSQL database.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## API Endpoints

```bash
# register a new account - POST {email, password}
http://localhost:PORT/auth/register

# Login - POST {email, password}
http://localhost:PORT/auth/login

# Get JWT profile info - GET (bearer authentication)
http://localhost:PORT/profile
```




## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
