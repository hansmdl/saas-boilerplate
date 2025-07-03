# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
