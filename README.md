# Bank Server

## Start
```
# ensure the environment variable $DATABASE_NAME is set to what you would like the database to be named
# ensure the environment variable $DATABASE_URL is set to your postgres url
npm install
npm start
```

## Development
```
npm install
eval $(cat .env) npm run create-db
eval $(cat .env) npm run migrate
eval $(cat .env) npm run start-dev
```

## Tests
```
eval $(cat .test-env) npm test
```
