# WorthIt - Backend API

> A community-driven discovery and validation platform for D2C and creator-led brands, focused on real buying experiences instead of hype.

## 🎯 What We're Building

**WorthIt** is a decision-support platform that answers one core question:  
**"Is this product actually worth buying for a real customer?"**

Unlike traditional product launch platforms driven by marketing and influencer hype, WorthIt enforces honesty by design through structured, mandatory feedback that surfaces both positive and negative experiences.

### Key Differentiators

- **Honesty-First**: Reviews require mandatory negative feedback and "who should NOT buy" answers
- **Experience-Driven**: Focus on post-usage validation, not launch-day hype
- **User-Centric**: No follower counts, no clout metrics, just honest opinions
- **Decision-Oriented**: Voting shows "% recommend" vs "% not worth it", not popularity

---

## 🏗️ Architecture Overview

This is the backend API server built with **Node.js**, **TypeScript**, and **Express**, following a clean, modular architecture.

```
worthit-backend/
├── src/
│   ├── config/          # Configuration files (CORS, logger, environment)
│   ├── controllers/     # Request handlers
│   ├── db/              # Database connection & initialization
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Authentication, validation, error handling
│   ├── models/          # Database models (Mongoose/Sequelize)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # DTOs and type definitions
│   ├── utils/           # Utility functions & helpers
│   ├── validators/      # Request validation schemas
│   ├── index.ts         # Application entry point
│   └── server.ts        # Express server setup
├── logs/                # Application logs
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** / **PostgreSQL** (depending on your database choice)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd worthit-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   DATABASE_URL=mongodb://localhost:27017/worthit
   # OR for PostgreSQL:
   # DATABASE_URL=postgresql://user:password@localhost:5432/worthit

   # JWT Authentication
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d

   # CORS
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

   # Optional: OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run database migrations** (if applicable)
   ```bash
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server should now be running at `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/google` | Login/Register with Google OAuth |
| POST | `/auth/logout` | Logout current user |
| GET | `/auth/me` | Get current user profile |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:id` | Get user profile | ✅ |
| PATCH | `/users/:id` | Update user profile | ✅ |
| DELETE | `/users/:id` | Delete user account | ✅ |

### Products (`/api/products`) - _Coming Soon_

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/products` | Create product listing | ✅ (Founder) |
| GET | `/products` | List all products | ❌ |
| GET | `/products/:id` | Get product details | ❌ |
| PATCH | `/products/:id` | Update product | ✅ (Founder) |
| DELETE | `/products/:id` | Delete product | ✅ (Founder) |

### Reviews (`/api/reviews`) - _Coming Soon_

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/reviews` | Submit a structured review | ✅ |
| GET | `/reviews/product/:productId` | Get reviews for a product | ❌ |
| PATCH | `/reviews/:id` | Update own review | ✅ |
| DELETE | `/reviews/:id` | Delete own review | ✅ |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### How it works:

1. User registers or logs in
2. Server returns a JWT token
3. Client stores token (localStorage/cookies)
4. Client sends token in `Authorization` header for protected routes

**Example Request:**
```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Schema (Overview)

### Users
```typescript
{
  id: string
  email: string
  username: string
  passwordHash: string (optional for OAuth users)
  authProvider: 'local' | 'google'
  socialLinks?: {
    instagram?: string
    linkedin?: string
  }
  role: 'user' | 'founder' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Products _(Planned)_
```typescript
{
  id: string
  founderId: string
  name: string
  category: string
  description: string
  whyItExists: string
  howToUse: string
  images: string[]
  demoVideo?: string
  websiteUrl?: string
  socialLink?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Reviews _(Planned - The Heart of the Platform)_
```typescript
{
  id: string
  userId: string
  productId: string
  
  // Honesty Framework (Required)
  actuallyUsed: 'yes' | 'gifted' | 'no'
  worthTheMoney: boolean
  disappointment: string  // MANDATORY
  whoShouldNotBuy: string // MANDATORY
  recommendation: 'recommend' | 'not_recommend'
  
  // Optional Details
  additionalFeedback?: string
  
  createdAt: Date
  updatedAt: Date
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode

# Linting & Formatting
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Code Structure Guidelines

#### Controllers
Handle HTTP requests and responses. Keep them thin - delegate business logic to services.

```typescript
// controllers/user.controller.ts
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.findById(userId);
  res.json({ user });
};
```

#### Services
Contain business logic and interact with models/database.

```typescript
// services/user.service.ts
export class UserService {
  async findById(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}
```

#### Validators
Define request validation schemas using Zod or Joi.

```typescript
// validators/user.validator.ts
export const updateUserSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});
```

---

## 🧪 Testing

```bash
npm test
```

We use **Jest** for unit and integration tests.

```typescript
// Example test structure
describe('Auth Service', () => {
  it('should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'Test123!' };
    const user = await authService.register(userData);
    expect(user.email).toBe(userData.email);
  });
});
```

---

## 🔒 Security Best Practices

- ✅ Passwords hashed with **bcrypt**
- ✅ JWT tokens with expiration
- ✅ CORS configured for allowed origins
- ✅ Input validation on all endpoints
- ✅ Rate limiting (to be implemented)
- ✅ SQL injection / NoSQL injection prevention
- ✅ XSS protection via sanitization

---

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `DATABASE_URL` | Database connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration | No | 7d |
| `ALLOWED_ORIGINS` | CORS allowed origins | Yes | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | No | - |

---

## 🚧 Roadmap

### Phase 1: Core Backend (Current)
- [x] User authentication (Email + Google OAuth)
- [x] User profile management
- [x] Database setup
- [x] Error handling & logging
- [ ] Product CRUD operations
- [ ] Review submission with honesty framework

### Phase 2: Review System
- [ ] Structured review validation
- [ ] Recommendation aggregation
- [ ] Review voting system
- [ ] Review moderation tools

### Phase 3: Discovery & Analytics
- [ ] Discovery feed algorithms
- [ ] Category-based filtering
- [ ] Product recommendation engine
- [ ] Analytics dashboard for founders

### Phase 4: Advanced Features
- [ ] Email notifications
- [ ] Founder response system (limited)
- [ ] Advanced search
- [ ] API rate limiting & caching

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

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
