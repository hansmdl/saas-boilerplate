# Project Configuration Summary

This document provides a complete overview of all the configuration files and dependency versions currently in use across the monorepo.

## Root `package.json`

```json
{
  "name": "my-saas-boilerplate",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm --filter \"./apps/*\" --filter \"./packages/*\" build",
    "dev": "pnpm --filter \"./packages/*\" build && pnpm --filter \"./apps/*\" --parallel dev",
    "lint": "pnpm --filter \"./apps/*\" --filter \"./packages/*\" lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "db:push": "pnpm --filter db db:push"
  },
  "devDependencies": {
    "@eslint/js": "8.57.1",
    "@rushstack/eslint-patch": "^1.12.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "dotenv-cli": "^8.0.0",
    "eslint": "8.57.1",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.2.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "globals": "^16.3.0",
    "prettier": "latest",
    "turbo": "latest"
  },
  "packageManager": "pnpm@10.12.4",
  "engines": {
    "node": ">=22.17.0"
  },
  "pnpm": {
    "overrides": {
      "eslint": "^8.57.0",
      "@typescript-eslint/eslint-plugin": "^8.0.0",
      "@typescript-eslint/parser": "^8.0.0"
    }
  },
  "dependencies": {
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

## Root `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "ui/*": ["packages/ui/*"],
      "db": ["packages/db"],
      "config/*": ["packages/config/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## `turborepo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## `apps/api/package.json`

```json
{
  "name": "api",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "dotenv -e ../../.env -- nest start --watch",
    "build": "nest build -p tsconfig.json",
    "build:tsc": "tsc -p tsconfig.json --listEmittedFiles",
    "start:dev": "nest start --watch",
    "start": "node dist/main",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {
    "@nestjs/common": "~11.1.3",
    "@nestjs/core": "~11.1.3",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/mapped-types": "^2.1.0",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "~11.1.3",
    "@types/bcrypt": "^5.0.2",
    "@types/cookie-parser": "^1.4.9",
    "@types/express": "^5.0.3",
    "@types/passport-jwt": "^4.0.1",
    "@types/passport-local": "^1.0.38",
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "db": "workspace:*",
    "email": "workspace:*",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "zod": "^3.25.68"
  },
  "devDependencies": {
    "@nestjs/cli": "11.0.7",
    "@nestjs/schematics": "11.0.5",
    "@types/node": "24.0.10",
    "@typescript-eslint/eslint-plugin": "7.18.0",
    "@typescript-eslint/parser": "7.18.0",
    "config": "^4.0.0",
    "eslint": "8.56.0",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "~5.8.3"
  }
}
```

## `apps/api/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": false,
    "outDir": "dist",
    "baseUrl": ".",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "paths": {
      "@/*": ["./src/*"],
      "email": ["../../packages/email"],
      "db": ["../../packages/db"],
      "config/*": ["../../packages/config/*"]
    },
    "typeRoots": ["../../node_modules/@types", "./node_modules/@types"]
  },
  "watchOptions": {
    "watchFile": "fixedPollingInterval"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## `packages/db/package.json`

```json
{
  "name": "db",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "db:push": "dotenv -e ../../.env -- npx prisma db push",
    "db:seed": "npx dotenv -e ../../.env -- npx ts-node seed.ts"
  },
  "dependencies": {
    "@nestjs/common": "~11.1.3",
    "@prisma/client": "6.11.0"
  },
  "devDependencies": {
    "@types/node": "^24.0.10",
    "config": "^4.0.0",
    "prisma": "~6.11.0",
    "ts-node": "^10.9.2",
    "typescript": "~5.8.x"
  }
}
```

## `packages/db/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "module": "CommonJS",
    "outDir": "./dist",
    "declaration": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## `packages/email/package.json`

```json
{
  "name": "email",
  "version": "0.0.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {
    "@nestjs/common": "~11.1.3"
  },
  "devDependencies": {
    "typescript": "~5.8.x"
  }
}
```

## `packages/email/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "module": "CommonJS",
    "outDir": "dist",
    "baseUrl": "."
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

# Summary of Actions Taken

1.  **Authentication System Refactor:**
    *   Replaced the deprecated `lucia-auth` library with `Passport.js` for a more robust and standard authentication system.
    *   Implemented JWT-based stateless authentication.
    *   Removed Lucia-specific models (`Session`, `Account`) from the Prisma schema.

2.  **Monorepo and Build System Fixes:**
    *   Corrected the root `dev` script to ensure shared packages are built before applications are started, resolving build order issues.
    *   Fixed `tsconfig.json` files for shared packages (`db`, `email`) to allow them to be compiled independently (`"noEmit": false`).
    *   Aligned module systems (`ESNext` for the API, `CommonJS` for packages) and added explicit `.js` extensions to relative imports to fix `ERR_MODULE_NOT_FOUND` runtime errors.
    *   Resolved workspace dependency issues by adding explicit `workspace:*` dependencies for `db` and `email` in the `api`'s `package.json`.
    *   Fixed the `api`'s `dev` script to correctly load environment variables using `dotenv-cli`.

3.  **Dependency Cleanup:**
    *   Identified and attempted to resolve numerous `eslint` peer dependency conflicts by using `pnpm.overrides`.
    *   Cleaned up the workspace by removing stray `node_modules` folders and `pnpm-lock.yaml` files, then running a clean install from the root.

The project is now in a stable, runnable state with a modernized authentication system and a corrected build process.
