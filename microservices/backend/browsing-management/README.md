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
```

### Date slice
Find question between dates (DESC)
```bash
GET /question/BetweenDates/_start=2017-01-01&_end=2022-01-01
```
### Paginate
Use `_page` to paginate returned data.
```bash
GET /question/page=6
```



