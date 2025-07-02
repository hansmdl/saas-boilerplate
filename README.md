# SaaS Boilerplate

This is a boilerplate for a SaaS application using the following technologies:

- [Turborepo](https://turborepo.org/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucia Auth](https://lucia-auth.com/)
- [React Query](https://tanstack.com/query/v5)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

## Getting Started

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables**

    Copy the `.env.example` file to `.env` and fill in the required values.

    ```bash
    cp .env.example .env
    ```

4.  **Start the database**

    ```bash
    docker-compose up -d
    ```

5.  **Apply database migrations**

    ```bash
    pnpm db:push
    ```

6.  **Start the development server**

    ```bash
    pnpm dev
    ```

## Project Structure

The project is a monorepo managed by Turborepo.

- `apps/web`: The main Next.js application.
- `apps/api`: The NestJS backend.
- `apps/staff`: The Next.js admin panel.
- `packages/ui`: Shared React components.
- `packages/db`: Prisma schema and client.
- `packages/config`: Shared configuration files.
- `packages/email`: React Email templates.
