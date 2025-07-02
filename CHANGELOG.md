# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Major Authentication Refactor**: Replaced the deprecated `lucia-auth` library with a robust implementation using `Passport.js` (`@nestjs/passport`, `@nestjs/jwt`, `passport-local`, `passport-jwt`). The new system uses stateless JWTs for session management.

### Removed

- Removed `lucia` and `@lucia-auth/adapter-prisma` dependencies.
- Removed `Session` and `Account` models from the Prisma schema as they were specific to the old authentication system.

### Fixed

- **Monorepo Build System**: Corrected multiple issues preventing the backend from starting.
- **TypeScript Configuration**: Fixed `tsconfig.json` files for shared packages (`db`, `email`) to ensure they are compiled correctly (`noEmit: false`).
- **Module Resolution**: Resolved `ERR_MODULE_NOT_FOUND` errors by aligning package module systems (`CommonJS` vs `ESNext`) and adding explicit workspace dependencies.
- **Dependency Conflicts**: Addressed and resolved numerous peer dependency conflicts, particularly with `eslint` and `@typescript-eslint`.
- **Environment Loading**: Ensured the API server correctly loads environment variables from the root `.env` file on startup.

## [0.1.0] - 2025-07-02

### Added- 2025-07-02

- Initial project structure with monorepo configuration (Turborepo, pnpm workspaces).
- Basic setup for `web`, `api`, and `staff` applications.
- Shared packages for `ui`, `config`, `db`, and `email`.
- Docker setup for PostgreSQL database.
- Git repository initialization and first commit with base configuration.
- Project uploaded to GitHub on `develop` branch.
- Created CHANGELOG.md to track future changes.
