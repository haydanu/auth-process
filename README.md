# AUTHENTICATION PROCESS

## Run the system

1. Open terminal and go to root folder
2. Make sure node is installed in your system
   `node -v`
3. Install all depedency
   `npm install`
4. Copy .env.example to .env and fill .env value with your ecosystem
5. Run npm run start:dev to start

## Available API

| Method | Path          | Body Parameter              |
| ------ | ------------- | --------------------------- |
| Post   | /users/signup | {userName, email, password} |
| Post   | /users/login  | {email, password}           |
