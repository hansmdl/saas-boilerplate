# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.3] - 2025-07-03

### Fixed

- **Dependency Conflicts**: Resolved multiple dependency warnings and peer dependency conflicts by removing local `eslint` and `@types/axios` definitions from workspace packages (`api`, `web`). This ensures all packages use the single, up-to-date versions defined in the root `package.json`, stabilizing the dependency tree.

## [0.2.2] - 2025-07-03

### Added

- **Database Seeding**: Implemented a Prisma seed script to populate the database with test data, including users and organizations. Configured a `db:seed` script to run the process.
- **Consistent Styling**: Applied a unified, modern, and light theme (`slate` and `blue` color palette) across both the `web` and `staff` applications for a consistent user experience.

### Fixed

- **Tailwind CSS v4 Syntax**: Corrected the global CSS files to use the modern `@import "tailwindcss";` directive, resolving the `Unknown at rule @tailwind` error.
- **ESLint Monorepo Configuration**: Fixed a persistent ESLint parsing error by explicitly setting the `parserOptions.project` path in the `.eslintrc.cjs` file for the `db` package, ensuring it correctly lints all its TypeScript files.

## [0.2.1] - 2025-07-03

### Fixed

- **Web App Build**: Corrected an error in the `web` application by replacing a standard `<a>` tag with Next.js's `<Link>` component for client-side navigation, resolving a build failure.
- **Tailwind CSS Configuration**: Updated the PostCSS configuration to be compatible with Tailwind CSS v4 by installing and using the `@tailwindcss/postcss` package.
- **API Startup**: Resolved a `MODULE_NOT_FOUND` error in the `api` application by correcting the `sourceRoot` and adding the `entryFile` path in `nest-cli.json`, ensuring the development server starts correctly.

## [0.2.0] - 2025-07-03

### Removed

- **Email Queue System**: Completely removed the email sending functionality and its related dependencies (`@nestjs/bullmq`, `bullmq`) to resolve persistent dependency injection and build errors. This includes the removal of the `JobsModule`, `email.worker`, and all related queue logic from the API. The feature will be re-integrated in a future release.

### Fixed

- **Module Resolution**: Corrected several `tsconfig.json` path mappings and package `exports` to fix the `Cannot find module 'config/features'` error and ensure reliable module resolution across the monorepo.
- **Build Configuration**: Restructured the `packages/config` workspace to use a standard `src` directory for source files and a `dist` directory for compiled output, aligning it with project conventions.

### Changed

- **Dependency Management**:
  - Removed the deprecated `@types/axios` package.
  - Removed `vitest` from dependencies, standardizing on Jest for testing.
  - Updated `eslint` to the latest version to resolve deprecation warnings.

## [0.1.0] - 2025-07-02

### Added- 2025-07-02

- Initial project structure with monorepo configuration (Turborepo, pnpm workspaces).
- Basic setup for `web`, `api`, and `staff` applications.
- Shared packages for `ui`, `config`, `db`, and `email`.
- Docker setup for PostgreSQL database.
- Git repository initialization and first commit with base configuration.
- Project uploaded to GitHub on `develop` branch.
- Created CHANGELOG.md to track future changes.
