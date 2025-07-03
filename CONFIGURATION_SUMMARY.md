# Resumen de Configuración del Proyecto

Este documento proporciona un resumen de los archivos de configuración clave en este monorepo de SaaS.

## 1. Configuración de la Raíz del Proyecto

### `package.json`
- **Gestor de Paquetes**: `pnpm@10.12.4` se utiliza para la gestión de dependencias y workspaces.
- **Scripts Principales**:
  - `dev`: Inicia todos los paquetes y aplicaciones en modo de desarrollo.
  - `build`: Construye todas las aplicaciones y paquetes para producción.
  - `lint`: Ejecuta el linter en todo el proyecto.
- **Dependencias Clave de Desarrollo**: `eslint`, `prettier`, `typescript`, `turbo`, `tailwindcss`.

### `pnpm-workspace.yaml`
- **Definición del Workspace**: Configura los workspaces del monorepo para incluir todos los directorios dentro de `apps/*` y `packages/*`.

### `turborepo.json`
- **Orquestación de Tareas**: Define el pipeline de tareas para `build`, `lint` y `dev`.
- **Cache**: Habilita el cacheo para las tareas de `build` para acelerar las compilaciones posteriores. La tarea `dev` tiene el cacheo deshabilitado.

### `tsconfig.json` (Raíz)
- **Base de TypeScript**: Proporciona la configuración base de TypeScript para todo el monorepo.
- **Paths**: Define alias de ruta (`@/*`, `ui/*`, `db`, etc.) para facilitar las importaciones entre paquetes.
- **Referencias**: Utiliza las referencias de proyecto de TypeScript para enlazar los diferentes paquetes y aplicaciones.

### `tailwind.config.cjs` y `postcss.config.cjs`
- **Tailwind CSS**: Configura Tailwind para escanear todos los archivos en `apps/` y `packages/` en busca de clases de utilidad.
- **PostCSS**: Configura el plugin `@tailwindcss/postcss` para procesar las directivas de Tailwind CSS, compatible con la v4.

---

## 2. Aplicación API (`apps/api`)

### `nest-cli.json`
- **CLI de NestJS**: Configura el comportamiento de la CLI de NestJS.
- **Punto de Entrada**: Especifica `src/main` como el punto de entrada de la aplicación, lo cual es crucial para que `nest start` funcione correctamente.

### `tsconfig.json`
- **Configuración de la API**: Extiende la configuración raíz de TypeScript con opciones específicas para un backend de NestJS, como `emitDecoratorMetadata`.
- **Salida**: Compila los archivos TypeScript al directorio `dist/`.

---

## 3. Aplicación Web (`apps/web`)

### `next.config.js`
- **Configuración de Next.js**:
  - `reactStrictMode`: Habilitado para detectar problemas potenciales en la aplicación.
  - `transpilePackages`: Configurado para transpilar el paquete `ui`, permitiendo el uso de componentes compartidos.

### `tsconfig.json`
- **Configuración de Next.js**: Extiende la configuración raíz de TypeScript con ajustes específicos para un proyecto de Next.js.

---

## 4. Aplicación Staff (`apps/staff`)

### `next.config.js`
- **Configuración de Next.js**: Idéntica a la de la aplicación `web`, asegura la transpilación del paquete `ui`.

### `tsconfig.json`
- **Configuración de Next.js**: Configuración estándar de TypeScript para una aplicación de Next.js.

---

## 5. Paquete de Base de Datos (`packages/db`)

### `schema.prisma`
- **Esquema de la Base de Datos**: Define todos los modelos de datos (User, Organization, Subscription, etc.), sus campos y relaciones.
- **Fuente de Datos**: Configurado para usar una base de datos PostgreSQL a través de la variable de entorno `DATABASE_URL`.
- **Generador de Cliente**: Configura la generación del Cliente Prisma en el directorio `node_modules/.prisma/client`.

### `package.json`
- **Seed Script**: Define un script `prisma.seed` que ejecuta `ts-node prisma/seed.ts` para poblar la base de datos con datos de prueba. El script `db:seed` invoca este comando a través de `prisma db seed`.
