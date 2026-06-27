# Cleaning Products E-Commerce

A modern, production-ready e-commerce platform built with Next.js 15, Prisma, PostgreSQL, and Tailwind CSS.

## Features

- **Full-Stack Next.js 15 App Router**: Modern server components and actions.
- **PostgreSQL Database**: Configured via Prisma ORM.
- **Authentication**: Secure credential and Google OAuth sign-in via NextAuth.
- **Shopping Cart**: Client-side persisted shopping cart using Zustand.
- **Checkout Flow**: Fully functional simulated checkout storing data securely.
- **Admin Dashboard**: Comprehensive dashboard for viewing sales, products, and orders.
- **Responsive UI**: Polished, mobile-first design using Tailwind CSS.

## Getting Started

1. Set up your `.env` file based on `.env.example`.
2. Ensure you have a running PostgreSQL instance. Update `DATABASE_URL`.
3. Run migrations:
   ```bash
   npx prisma db push
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. To populate the store with demo data, visit: `http://localhost:3000/api/seed`.

## Deployment

This application is ready to be deployed on Vercel or any standard Node.js hosting.
Ensure environment variables are configured in the platform dashboard.
Run `npx prisma generate` and `npx prisma migrate deploy` during the build step.
