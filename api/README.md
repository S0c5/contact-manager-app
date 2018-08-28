# API 

## Description

API in sails

## Development

- Node v10 ( use [NVM](https://github.com/creationix/nvm))
- docker >18.06 and docker-compose >1.22.0
- gettext ( install it in osx by `brew install gettext && brew link --force gettext` )

## Env

|Name                   | Description      |
| --------------------- |:-------------:|
| NODE_ENV              | env for node |
| AWS_ACCESS_KEY_ID     | aws access key id |
| AWS_ACCESS_SECRET_KEY | aws secret key|
| AWS_BUCKET_NAME       | aws bucket name |


## Pre-run

please run the database

```bash
 $ cd ... && make db-local
```

## Test

run the test with 
```bash
 $ npm test
```