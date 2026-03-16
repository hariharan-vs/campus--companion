# Campus Companion

A comprehensive web application designed to enhance the campus experience for students. **Campus Companion** provides essential tools for navigation, scheduling, support, and staying informed about campus activities.

---

# Features

### Interactive Campus Map

Navigate the campus easily using an integrated map interface.

### Academic Schedule

View and manage your class schedules and important academic events.

### Support Tickets

Submit and track support requests for technical issues, facilities, or campus services.

### Announcements

Stay updated with the latest campus news, events, and important notifications.

### User Profile

Manage personal information and user preferences.

### Secure Authentication

User registration and login system with password reset functionality.

---

# Tech Stack

**Frontend**

* React 18
* TypeScript
* Vite

**Styling**

* Tailwind CSS
* Shadcn UI Components

**Backend**

* Supabase (PostgreSQL Database, Authentication, Real-time subscriptions)

**State Management**

* React Query (TanStack Query)

**Forms**

* React Hook Form with validation

**Routing**

* React Router

**Testing**

* Vitest (Unit Testing)
* Playwright (End-to-End Testing)

**Code Quality**

* ESLint

**Package Manager**

* npm (Bun lockfile support included)

---

# Prerequisites

Before running the project, ensure you have:

* Node.js (version 18 or higher)
* npm or bun
* Supabase account for backend services

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/hariharan-vs/campus--companion.git
cd campus-companion
```

## 2. Install dependencies

```bash
npm install
```

or

```bash
bun install
```

---

# Supabase Setup

### 1. Create a Supabase Project

Go to https://supabase.com and create a new project.

### 2. Get Project Credentials

Copy the following from the project dashboard:

* Project URL
* Anon Public Key

### 3. Update Configuration

Update the Supabase configuration inside:

```
src/integrations/supabase/client.ts
```

### 4. Run Database Migrations

```bash
npx supabase db push
```

---

# Running the Application

Start the development server:

```bash
npm run dev
```

or

```bash
bun run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

---

# Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Build the project for production.

```bash
npm run build:dev
```

Build the project in development mode.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run ESLint for code linting.

```bash
npm run test
```

Run tests once.

```bash
npm run test:watch
```

Run tests in watch mode.

---

# Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   └── other-components
├── contexts/            # React contexts (Auth etc.)
├── hooks/               # Custom React hooks
├── integrations/        # External integrations
│   └── supabase/        # Supabase client and types
├── lib/                 # Utility functions
├── pages/               # Application pages
└── test/                # Test files
```

---

# Contributing

1. Fork the repository
2. Create a new feature branch

```
git checkout -b feature/amazing-feature
```

3. Commit your changes

```
git commit -m "Add some amazing feature"
```

4. Push to your branch

```
git push origin feature/amazing-feature
```

5. Open a Pull Request
---

# Support

If you encounter any issues or have questions, please create an **issue in this repository**.

---

# Author

**Hariharan VS**

Engineering Student | Developer | Tech Enthusiast
