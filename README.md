# Bank Server

## Start
```
# ensure the environment variable $DATABASE_URL is set to your postgres url
npm install
npm start
```

## Development
```
npm install
eval $(cat .test-env) npm run create-db
eval $(cat .test-env) npm run migrate
eval $(cat .test-env) npm run start-dev
```

## Tests
```
eval $(cat .test-env) npm test
```
