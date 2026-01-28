WorthIt Backend API

Overview
- Node.js + Express 5 + TypeScript API for brands, reviews, and users.
- Uses MongoDB via Mongoose, JWT auth, Helmet for security, Winston logging.

Tech Stack
- Express, TypeScript, Mongoose, JWT, Helmet, Winston, express-validator.

Project Structure
- See `src/` for `config`, `controllers`, `db`, `middlewares`, `models`, `routes`, `services`, `utils`, `validators`, plus `index.ts` and `server.ts`.

Setup
- Prereqs: Node 18+, MongoDB running locally or remote.
- Install: 
```bash
npm install
```
- Environment: create `.env` in `worthit-backend/` with:
```env
PORT=5000
DB_URL=mongodb://localhost:27017
CLIENT_URL=http://localhost:3000
JWT_SECRET_KEY=your-secret
NODE_ENV=development
```
- Run (dev):
```bash
npm run dev
```
- Build + start (prod):
```bash
npm run build
npm start
```
- Seed sample data (optional):
```bash
npm run seed
```

API
- Base URL: `http://localhost:5000/api`

- Auth (`/api/auth`)
  - POST `/login` → Login and receive JWT
  - GET `/me` → Current user (requires `Authorization: Bearer <token>`)

- Users (`/api/user`)
  - POST `/` → Create user
  - GET `/` → List users
  - GET `/by-name` → List users (by name)
  - GET `/:userId` → Get user by ID
  - PATCH `/` → Update authenticated user (auth)
  - DELETE `/` → Delete authenticated user (auth)

- Brands (`/api/brand`)
  - POST `/` → Create brand (auth)
  - GET `/` → List brands
  - GET `/user/my-brands` → List brands created by current user (auth)
  - GET `/search/:identifier` → Get brand by name or slug
  - GET `/slug/:slug` → Get brand by slug
  - GET `/:brandId` → Get brand by ID
  - PATCH `/:brandId` → Update brand (auth)
  - DELETE `/:brandId` → Delete brand (auth)
  - POST `/:brandId/view` → Increment brand view count
  - PATCH `/:brandId/team` → Update brand team (auth)

- Reviews (`/api/review`)
  - POST `/brand/:brandId` → Create review for a brand (auth)
  - GET `/brand/:brandId` → List all reviews for a brand
  - GET `/user/:userId` → List reviews by user
  - GET `/:reviewId` → Get review by ID
  - PATCH `/:reviewId` → Update review (auth)
  - DELETE `/:reviewId` → Delete review (auth)
  - POST `/:reviewId/helpful` → Mark helpful (auth)
  - DELETE `/:reviewId/helpful` → Unmark helpful (auth)

- Health (`/api/health`)
  - GET `/` → Service status

Auth
- Send JWT in the `Authorization` header: `Bearer <token>`.
- Secret is configured via `JWT_SECRET_KEY` in `.env`.

Scripts
- `dev`: start with hot reload via `tsx`
- `build`: compile TypeScript
- `start`: run compiled server
- `seed`: seed the database

Notes
- CORS is configured in `src/config/cors.ts` using `CLIENT_URL`.
- Server boots from `src/index.ts` and listens on `PORT`.

[Add your license here]

---

## 👥 Team

Built with ❤️ by the WorthIt team

---

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Email: [your-email@example.com]

---

**Remember**: This platform is built on honesty, not hype. Every line of code should serve that mission. 🎯
