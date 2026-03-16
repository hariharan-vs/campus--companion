Campus Companion
A comprehensive web application designed to enhance the campus experience for students. Campus Companion provides essential tools for navigation, scheduling, support, and staying informed about campus activities.

Features
Interactive Campus Map: Navigate the campus with ease using the integrated map feature
Academic Schedule: View and manage your class schedule and important academic dates
Support Tickets: Submit and track support requests for technical issues, facilities, or other campus services
Announcements: Stay updated with the latest campus news, events, and important notices
User Profile: Manage your personal information and preferences
Secure Authentication: User registration and login with password reset functionality
Tech Stack
Frontend: React 18 with TypeScript
Build Tool: Vite
Styling: Tailwind CSS with Shadcn UI components
Backend: Supabase (PostgreSQL database, authentication, real-time subscriptions)
State Management: React Query (TanStack Query)
Forms: React Hook Form with validation
Routing: React Router
Testing: Vitest for unit tests, Playwright for E2E testing
Linting: ESLint
Package Manager: npm (with Bun lockfile support)
Prerequisites
Node.js (version 18 or higher)
npm or bun
Supabase account (for backend services)
Installation
Clone the repository

Install dependencies

Set up Supabase

Create a new project at supabase.com
Copy your project URL and anon key
Update the Supabase configuration in client.ts
Run the database migrations:
Start the development server

Open your browser

Navigate to http://localhost:5173 to view the application.

Available Scripts
npm run dev - Start the development server
npm run build - Build the project for production
npm run build:dev - Build the project in development mode
npm run preview - Preview the production build locally
npm run lint - Run ESLint for code linting
npm run test - Run tests once
npm run test:watch - Run tests in watch mode
Project Structure
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
If you encounter any issues or have questions, please create an issue in this repository or contact the development team.
