# Simple Books Management Frontend

## Tech Stack
- React + TypeScript (Vite)
- TanStack Query (Server state management)
- React Router (Routing & Guards)
- shadcn/ui + Tailwind CSS (Component Layer)
- Axios (HTTP Client)
- react-hook-form + zod (Forms and Validation)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Environment Variables**
   Create a `.env` file in the root directory (optional, currently hardcoded to `http://localhost:3000` in `src/lib/api.ts` for simplicity). If configuring via env:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
3. **Start Development Server**
   ```bash
   npm run dev
   ```

## MVVM Architecture Layer Mapping

This project strictly adheres to the Model-View-ViewModel (MVVM) design pattern, separated logically across the directory structure:
- **Model (`src/models/` & `src/lib/api.ts`)**: Defines the core domain types (TypeScript interfaces) and data-fetching logic (Axios functions). It acts as the ultimate source of truth for the application's backend interaction.
- **ViewModel (`src/viewmodels/`)**: Utilizes TanStack Query hooks (`useQuery` and `useMutation`) to bridge the Model and View. It encapsulates server state management, caching, invalidation, and exposes data and actions to the View in a reactive manner without bleeding HTTP concerns into components.
- **View (`src/pages/` & `src/components/`)**: Comprises the presentational layer built primarily with `shadcn/ui` and Tailwind. The View components are completely decoupled from network calls and strictly consume state and actions exposed by the ViewModel hooks (e.g., displaying `isLoading` or `error` states directly from TanStack Query).
