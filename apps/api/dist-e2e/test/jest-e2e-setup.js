"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const db_1 = require("db");
// Cargar variables de entorno desde el archivo .env raíz
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../../../.env') });
// Configurar variables de entorno específicas para pruebas
process.env.PORT = '3333'; // Puerto diferente para pruebas
// Inicializar cliente Prisma para pruebas
const prisma = new db_1.PrismaClient();
// Verificar que las variables de entorno críticas estén cargadas
console.log('Variables de entorno cargadas para pruebas e2e:');
console.log(`- PORT: ${process.env.PORT}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurado' : 'No configurado'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'Configurado' : 'No configurado'}`);
// Configurar timeout global para pruebas
jest.setTimeout(30000);
// Limpiar datos de prueba
async function cleanupTestData() {
    try {
        // Eliminar organizaciones de prueba
        await prisma.organization.deleteMany({
            where: {
                name: {
                    contains: 'Test Organization',
                },
            },
        });
        // Eliminar usuarios de prueba
        await prisma.user.deleteMany({
            where: {
                email: {
                    contains: 'test@example.com',
                },
            },
        });
        console.log('✅ Datos de prueba limpiados correctamente');
    }
    catch (error) {
        console.error('❌ Error al limpiar datos de prueba:', error);
    }
}
// Configurar hooks globales para pruebas
global.beforeAll(async () => {
    try {
        // Verificar conexión a la base de datos
        await prisma.$connect();
        console.log('✅ Conexión a la base de datos establecida para pruebas e2e');
        // Limpiar datos de prueba al inicio
        await cleanupTestData();
    }
    catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        throw error;
    }
});
global.afterAll(async () => {
    try {
        // Limpiar datos de prueba
        await cleanupTestData();
        // Cerrar conexión
        await prisma.$disconnect();
        console.log('✅ Conexión a la base de datos cerrada después de pruebas e2e');
    }
    catch (error) {
        console.error('❌ Error al desconectar de la base de datos:', error);
    }
});
global.beforeEach(() => {
    console.log('Iniciando prueba...');
});
global.afterEach(() => {
    console.log('Prueba finalizada');
});
