# smalldidiUrl


## a url shorten service

---
## Requirement

- **Language**: TypeScript / nodeJS
- **FrameWork**: Express / Prisma
- **DataBase**: mySql/MariaDB
- **Lint**: eslint, AirBnb
- **Test**: jest
- **CI/CD**: Drone
---
## Development
```
// start databse
mongod --dbpath {path/to/your/db/dir}/data

// start dev server
git clone git@github.com:ChiShouWu/smalldidiUrl.git 
cd smalldidiUrl
npm install
npm run dev // This will run lint first than dev
```
## Development with docker
```
sudo docker-compose -f docker/docker-compose-dev.yaml up --build
```

## Test
```
npm run test
```

## Build
```
npm run build
```

