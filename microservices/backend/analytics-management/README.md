
## Description


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
Dev environment is running on http://localhost:5005  
```bash
# Questions count for a certain period of time  
GET /questions/count?start=YYYY-MM-DD&end=YYYY-MM-DD
 
#All-time monthly count  
GET /questions/monthly_count
```

### Keyword related

```bash
#Top 20 keywords used and their count  
GET /keywords/most_used
GET /keywords/most_used?start=YYYY-MM-DD&end=YYYY-MM-DD
```

### User related
User behavior
```bash
# Average questions per user on hourly basis
GET /users/hourly_avg
#Average questions/answers per hour of day
#GET /users/time_average
```

