# Portfolio Site - Adv. Gazi Nazrul Islam Manik

Multi-page lawyer portfolio built with React, React Router, and MongoDB backend.

## Features

- Classic-elegant design with Bengali localization
- Practice areas showcase and case highlights
- Admin panel for managing cases
- Consultation form sends messages to Formspree
- MongoDB database (in-memory for dev, Atlas for production)
- JWT authentication
- Responsive design

## Run Locally

```bash
npm install
npm run dev
```

In another terminal, start the API server:

```bash
npm run server
```

The server uses an in-memory MongoDB instance for development, so no external database setup is needed.

## Build

```bash
npm run build
```

## Admin Panel

### Accessing the Admin Panel

The admin panel is **hidden** from regular visitors. To access it:

1. Hold **Ctrl + Shift** and click on the **"Cases"** navigation link
2. You will be redirected to the login page
3. Enter your credentials (default: `manik12345` / `admin12345`)

### Features

- Add new cases with title, category, summary, and outcome
- View all cases in real-time
- Delete cases with one click
- Automatic database sync

## Configuration

Environment variables in `.env`:
- `ADMIN_USERNAME` - Admin username
- `ADMIN_PASSWORD` - Admin password
- `JWT_SECRET` - Secret key for JWT tokens
- `MONGO_URI` - MongoDB Atlas connection string (production only)
- `MONGO_DB_NAME` - Database name (default: `advPortfolio`)
- `CORS_ORIGIN` - Frontend URL for CORS
- `VITE_FORMSPREE_ENDPOINT` - Formspree form endpoint URL (for consultation form submissions)

## Database

- **Development**: Uses in-memory MongoDB (no setup required)
- **Production**: Uses MongoDB Atlas
  - Set `NODE_ENV=production` to use Atlas
  - Configure `MONGO_URI` in `.env`

## Docker

```bash
docker build -t manik-portfolio .
docker run -p 3001:3001 --env-file .env -e NODE_ENV=production manik-portfolio
```

## Tech Stack

- **Frontend**: React 19, React Router 7, Vite 8
- **Backend**: Node.js, Express
- **Database**: MongoDB (in-memory-server for dev, Atlas for production)
- **Auth**: JWT
- **Typography**: Bengali fonts (Noto Serif Bengali, Hind Siliguri)
