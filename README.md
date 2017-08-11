# Bank Server

## Start
```
npm install
eval $(cat .env) npm run create-db
eval $(cat .env) npm run migrate
eval $(cat .env) npm run start-dev
```

## Tests
```
eval $(cat .test-env) npm run create-db
eval $(cat .test-env) npm test
```
