# Contact Manager App 
[![Build Status](https://travis-ci.com/S0c5/contact-manager-app.svg?branch=develop)](https://travis-ci.com/S0c5/contact-manager-app)

## Description

this contact manager app allows to create, list and retrieve information about your contacts! AWESOME!.

## Problem

the problem is: [raxua-contact-manager-app](https://github.com/RauxaRepo/Node-Sails-Coding-Challenge/blob/master/coding_challenge.md), 

## Solution

One Application that allows to a customer the creation, listing and detail of him/her contacts. This application has the next techs and architecture.

## Architecture

-  **Root**: Configuration Files to deploy.
-  **Backend**: API Rest JSON based on Sails.js framework.
-  **Frontend**:  React Application.
-  **Infrastructure**:  Nginx with reverse proxy with docker container for the applications, I implemented scripts to automate the deployment using docker-machine with docker-compose.


## Folders

```
/api: api made in sails
/app: React App
/infrastructure: files realted to the infrastructure it includes files of configure docker-compose, sql to seed databases. 
  /database: sql files to seed application
  /nginx: Dockerfile to configure the nginx reversed proxy
```

## Development 

### Requirements (OSX): 

- Node v10 ( use [NVM](https://github.com/creationix/nvm))
- docker >18.06 and docker-compose >1.22.0
- gettext ( install it by `brew install gettext && brew link --force gettext` )

Please install all `npm` libraries using: 

```bash
  $ make prepare
```

### RUN 

to run the both apps ( the `api` and `app`) run: 

```bash
$ make run-dev
```

**API**:
```bash 
$ cd ./api && npm start
```

**APP**:
```bash 
$ cd ./app && npm start
```

### Test

to test the API please go to /api and run 

```bash
$ npm test
```

## Deployment


#### prerequisite

1. ***NOTE:*** read the requirements of development too.
2. ***NOTE:*** create or use one account in google or amazon.
3. ***NOTE:*** preferable if you have one domain to point to your instance


#### Requirements

  - docker-machine
  
#### Steps: 

##### Deploy With LetsEncrypt:

1. Create your instance using docker machine 
2. point to your domain `example.com` to the ip of your instance.
3. Edit `config.env` to add: 
   ```bash
      HOST_NAME={HOST_NAME}
      EMAIL={EMAIL}
      PORT={API_PORT}
      AWS_ACCESS_KEY_ID={ACCESS_KEY_ID_FOR_S3}
      AWS_ACCESS_SECRET_KEY={AWS_ACCESS_SECRET_KEY_FOR_S3}
      AWS_BUCKET_NAME={BUCKET_NAME_FOR_STORE_YOUR_IMAGE}
      NODE_ENV={ENV_FOR_NODE}
      DATABASE_URI={DATBASE_URI}
   ```
4. env your `docker-machine` instance:

```bash
  $ eval (docker-machine env the-name-of-my-instance)
```

5. get your letsencrypt certificate:

```bash
  $ make letsencrypt
```

6. deploy the app: 

```bash
  $ make deploy
```

##### Deploy without domain:

1. Create your instance using docker machine 
3. Edit `config.env` to add: 
   ```bash
      HOST_NAME={HOST_NAME} // OPTIONAL
      EMAIL={EMAIL} // OPTIONAL
      PORT={API_PORT}
      AWS_ACCESS_KEY_ID={ACCESS_KEY_ID_FOR_S3}
      AWS_ACCESS_SECRET_KEY={AWS_ACCESS_SECRET_KEY_FOR_S3}
      AWS_BUCKET_NAME={BUCKET_NAME_FOR_STORE_YOUR_IMAGE}
      NODE_ENV={ENV_FOR_NODE}
      DATABASE_URI={DATBASE_URI}
   ```
4. env your `docker-machine` instance:

```bash
  $ eval (docker-machine env the-name-of-my-instance)
```

6. deploy the app: 

```bash
  $ make deploy
```


## Issues

Please feel free to contribute to this repository:

* before push create an issue with your feature
* any bug please create an issue
* any thing without an issue that's a paddling ;).



## Author

David Barinas

* [linkedin](https://www.linkedin.com/in/davidbarinas/)


