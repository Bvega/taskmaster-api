# TaskMaster API (mod-15) — Backend Development

One-day educational backend built with **Express + MongoDB (Atlas) + JWT**.  
Focus: Auth basics, ownership checks, Mongoose relations.

## Quick Start
```bash
npm install
copy .env.example .env    # Windows
# Set MONGO_URI to your Atlas connection string and choose a JWT_SECRET
npm run dev               # starts nodemon on PORT (default 4000)
# Visit http://localhost:4000/health
```

## Environment
- `PORT` (default 4000)
- `MONGO_URI` (MongoDB Atlas connection string)
- `JWT_SECRET` (any long random string)

## Project Structure
```
config/           # db connection
controllers/      # route handlers (to be added)
models/           # Mongoose schemas (User, Project, Task to be added)
routes/api/       # userRoutes, projectRoutes, taskRoutes to be added
middleware/       # auth (TBD), ownership (TBD), notFound, errorHandler
utils/            # jwt helpers, asyncHandler (TBD)
server.js         # app entry
```

## Endpoints (MVP, to be implemented)
- **Auth**: POST `/api/users/register`, POST `/api/users/login`
- **Projects**: CRUD owner-only under `/api/projects`
- **Tasks**: Nested CRUD under `/api/projects/:projectId/tasks`, plus PUT/DELETE `/api/tasks/:taskId`

## Definition of Done
- 401 without token; 403 for cross-user access
- README + `.env.example` committed, `.env` ignored
- Milestone commits per phase
```

