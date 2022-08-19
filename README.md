# Aathma 👻

![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TYPESCRIPT](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TAILWINDCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![EXPRESSJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PRISMA](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SocketIO](
https://img.shields.io/badge/SocketIO-black?style=for-the-badge&logo=framer&logoColor=blue)
![POSTGRESQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![ESLINT](
https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![PRETTIER](
https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

![HEROKU](
https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![ACTIONS](
https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## Installation and Development
*Note* : Postgresql Needs to be installed locally or run using before starting the project

### Sample ENV file
Modify the below sample and store as `.env`. in project root before running  
```
DATABASE_URL=postgres://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE_NAME}
VITE_API_URL=http://localhost:3000/api
EXPRESS_PORT=8080
```

### Install All packages  
```yarn```

### Migrate Database  
```yarn migrate:dev```

### Run Client  
```yarn client:dev```

### Run Server  
```yarn server:dev```

### Run Client & Server  
```yarn dev```


## Known Bugs
- WebSocket fails to update upvote count for hidden comments
