# Simple Books Management Backend

A NestJS backend API for a "Simple Books Management" CRUD system with role-based access control (Teacher and Student).

## Tech Stack
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT (`@nestjs/jwt`, `passport-jwt`), bcrypt
- **Validation:** `class-validator`, `class-transformer`

## Setup Steps

### 1. Environment Variables
Create a `.env` file in the root directory:
```env
# Database connection string for PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/books_management?schema=public"

# JWT Secret for signing tokens
JWT_SECRET="your-super-secret-jwt-key"
```

### 2. Database Migration
Run the Prisma migrations to initialize your database schema:
```bash
npx prisma migrate dev
```

### 3. Start the Server
Run the NestJS development server:
```bash
npm run start:dev
```
The server will start on `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Description | Required Role |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user (`username`, `password`, `role`) | None |
| `POST` | `/auth/login` | Log in and receive a JWT | None |
| `POST` | `/books` | Create a book | `TEACHER` |
| `GET` | `/books` | List books created by the authenticated teacher | `TEACHER` |
| `GET` | `/books/:id` | View one of the authenticated teacher's own books | `TEACHER` |
| `PATCH`| `/books/:id` | Update own book | `TEACHER` |
| `DELETE`| `/books/:id` | Delete own book | `TEACHER` |
| `POST` | `/books/:bookId/assign` | Assign a book to a student | `TEACHER` |
| `GET` | `/my-books` | List books assigned to the authenticated student | `STUDENT` |
