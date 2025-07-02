# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `Account` model to support OAuth social logins.
- `Session` model to manage user refresh tokens.
- `PasswordResetToken` model for the password recovery flow.
- Initial `AuthModule` and `AuthService` setup in the API.
- Configured Lucia Auth with Prisma adapter.

### Changed
- Updated `Subscription` model with `trialStart` and `trialEnd` fields.

### Deprecated
- 

### Removed
- 

### Fixed
- 

### Security
- 

## [0.1.0] - 2025-07-02

### Added
- Initial project structure with monorepo configuration (Turborepo, pnpm workspaces).
- Basic setup for `web`, `api`, and `staff` applications.
- Shared packages for `ui`, `config`, `db`, and `email`.
- Docker setup for PostgreSQL database.
- Git repository initialization and first commit with base configuration.
- Project uploaded to GitHub on `develop` branch.
- Created CHANGELOG.md to track future changes.
