# FromPolandRecruitmentChallenge

Simple project that contains NestJs and Next.JS applications.
It displays current EUR Exchange rate and allows user to convert PLN to EUR

# Running

***
At first u need to start nestJs server.
## Backend
To start server go to `backend` folder, do `npm ci`

Please create `.env` file in project root folder with provided structure:

```bash
API_KEY=XXXX-YOUR'S-API-KEY-XXXX
API_URL=https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api
```

Then run `npm run start:dev`

***
## Frontend

To start Frontend project go to `frontend` folder, run `npm ci` command.

Please create `.env.local` file in project root folder with provided structure:

```bash
NEXT_PUBLIC_BACKEND_URL=ADDRESS OF LOCAL SERVER - http://localhost:3000
```
and then do `npm run dev`

