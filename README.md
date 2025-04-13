# Getting Started on Docker
## Environments Variables
 - .env.prod (Production)
 - .env.dev (Development)

## Run Tests
````bash
npm run test
````
## Dev

```bash
docker compose -f ./dev/compose.yaml up -d --build
```

## Prod
```bash
docker compose -f ./deploy/compose.yaml up -d --build
```

