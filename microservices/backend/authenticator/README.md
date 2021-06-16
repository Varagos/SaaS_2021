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

## Migrations

Initial setup for migrations  
Add following lines inside ormconfig.json (removing synchronization is suggested) 
```bash
  "migrations": ["dist/migration/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "migration"
  }
```  

```bash
$ mkdir migration
$ npm run build
```

Insert new script in package.json  
```json 
"typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
```

Drop DB and create migration based on existing entities by comparing 
diff
```bash
$ npm run typeorm migration:generate -- -n InitialSchema
$ npm run build

# Execute the migration
$ npm run typeorm migration:run
```
This command will execute all pending migrations and run them in a sequence ordered by their timestamps. This means all sql queries written in the `up` methods of your created migrations will be executed.  
<br>
If for some reason you want to revert the changes, you can run:
```bash
$ npm run typeorm migration:revert
```
This command will execute `down` in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.

### Create new migration
```bash 
$ npm run typeorm migration:generate -- -n [MigrationName]
```
