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
Dev environment is running on http://localhost:5004  
Find all questions
```bash
GET /questions
```

### Simple Pagination
Use `page` and optionally `limit` to paginate returned data.

Default limit is 10 questions per page.
```bash
GET /quesions/paginate?page=4
GET /quesions/paginate?page=4&limit=20
```

### Date slice Pagination
Find question between dates (DESC)
```bash
GET /questions/sort_dates?page=1&start=2017-01-01&end=2022-01-01
```

### Keywords Pagination
Find question by filtering keywords 
(One or many keywords can be provided)
```bash
GET /questions/keywords?page=1&keywords[]=1&keywords[]=5
```

Get all keywords
```bash
GET /keywords
```


