# Simple Books Management

A full-stack application for a "Simple Books Management" CRUD system with role-based access control (Teacher and Student).

## Project Structure

This repository contains two main directories:
- `backend/`: NestJS API powered by Prisma and PostgreSQL.
- `frontend/`: React application built with Vite, Tailwind CSS, and shadcn/ui.

---

## Backend Setup

**Tech Stack:** NestJS, Prisma, PostgreSQL, JWT Auth

1. **Environment Variables:**
   Create `backend/.env` with your database URL and JWT secret:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/books_management?schema=public"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

2. **Database Migration:**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   ```

3. **Start the Server:**
   ```bash
   npm run start:dev
   ```
   The backend will start on `http://localhost:3000`.

---

## Frontend Setup

**Tech Stack:** React, TypeScript, Vite, TanStack Query, React Router, shadcn/ui, Tailwind CSS

**Architecture:** Strictly adheres to the **Model-View-ViewModel (MVVM)** pattern to decouple network calls, state caching, and UI presentation.

1. **Environment Variables:**
   Create `frontend/.env` to point to the backend URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

2. **Start the Development Server:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

---

## Endpoints

| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | None |
| `POST` | `/auth/login` | Log in and receive a JWT | None |
| `POST` | `/books` | Create a book | `TEACHER` |
| `GET` | `/books` | List books created by the teacher | `TEACHER` |
| `GET` | `/books/:id` | View one of the teacher's own books | `TEACHER` |
| `PATCH`| `/books/:id` | Update own book | `TEACHER` |
| `DELETE`| `/books/:id` | Delete own book | `TEACHER` |
| `POST` | `/books/:bookId/assign`| Assign a book to student(s) | `TEACHER` |
| `GET` | `/my-books` | List books assigned to the student | `STUDENT` |
