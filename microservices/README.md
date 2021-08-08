## About the project
SaaS team 37  
SECE NTUA 2021
---

### Redis
Choreographer's Redis server is currently hosted on <a href="https://www.redislabs.com">RedisLabs</a>


### Deployment tips
Create `new heroku application` and connect it to a `new remote`  
```bash
$ heroku create <app-name> --remote <heroku-remote-name> --region eu  
```
e.g.,  
$ heroku create askmeanything37-choreographer --remote heroku-ms-choreographer

Create `ProcFile` in App root  
e.g., for nestjs  
```text
web: npm run start:prod
```

git add and commit changes

Push a subdirectory as a heroku app  
```bash
$ git subtree push --prefix <path/to/app> <heroku-remote-name> main

# If pushing from a different branch than main
$ git subtree push --prefix <path/to/app> <heroku-remote-name> <Other-branch>:main
```
<br />

#### Other commands  
Provide --remote <remote-name> or --app <app-name> when  
dealing with more than 1 apps in same repo.
```bash
# View logs
$ heroku logs --tail
# View app console logs
$ heroku logs --source <app-name>

#Open heroku app in browser
$ heroku open

# Start a console
$ heroku run bash

# Show config file
$ heroku config

# Set config env var e.g.
$ heroku config:set TIMES=2
$ heroku config:set TIMES=2 --remote <remote-name>
#or
$ heroku config:set TIMES=2 --app <app-name>
#Or
$ heroku config:unset TIMES  

# Add pg database  
$ heroku addons:create heroku-postgresql:hobby-dev --remote <remote-name>

# Open postgresql cli
$ heroku pg:psql --remote <remote-name>
```


