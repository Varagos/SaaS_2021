<p align="center">
  <img src="https://www.nicepng.com/png/detail/207-2078186_comment-free-icon-comment-free-download.png"  width="320" alt="Comment icon" />
</p>

# Comment create management

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

### Endpoints
Authentication with jwt token is required as bearer header.

Create a new comment
```bash
POST /comments
```  

Delete an existing comment provided you are its author  
```bash
DELETE /comments/:id
```

