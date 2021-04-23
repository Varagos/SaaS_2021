<p align="center">
  <a target="blank"><img src="https://image.flaticon.com/icons/png/512/90/90384.png" width="320" alt="Nest Logo" /></a>
</p>


#Browsing management component
## Description
A micro-services component implemented using
[Nest](https://github.com/nestjs/nest) framework in TypeScript.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Available endpoints

```bash
# Find all questions
http://localhost:5004/question

# Find question between dates
http://localhost:5004/question/BetweenDates/from=:start&to:end

# Get 10 questions with offset (DESC order) - One webPage of questions
http://localhost:5004/question/LimitOffset/offset=0
```



