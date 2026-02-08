# Pet Management Backend

A simple backend API for managing pets, adoptions, species, and users. Built with Express and TypeScript.

## Getting started

Install dependencies:

```bash
npm i
```

Run the project in development mode:

```bash
npm run dev
```

The server runs on port 8080 by default.

## API documentation

Once the server is running, Swagger API docs are available at:

**http://localhost:8080/api-docs/**

Use it to explore and try out the endpoints (auth, pets, adoptions, species, users).

## Project overview

- **Auth** — Login and JWT-based authentication
- **Pets** — Create, update, list pets; supports image uploads
- **Adoptions** — Manage adoption requests and flow
- **Species** — Species listing and management
- **Users** — User data and roles

Uses Express, TypeScript, MySQL (via jm-ez-mysql), Mongoose, and Swagger for docs.
