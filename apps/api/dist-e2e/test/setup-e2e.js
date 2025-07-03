"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const db_1 = require("db");
const vitest_1 = require("vitest");
// Configurar variables de entorno específicas para pruebas
process.env.PORT = '3333'; // Puerto diferente para pruebas
// Nota: No podemos modificar NODE_ENV directamente ya que es de solo lectura
// Cargar variables de entorno desde el archivo .env raíz
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../../../.env') });
// Verificar que las variables de entorno críticas estén cargadas
console.log('Variables de entorno cargadas para pruebas e2e:');
console.log(`- PORT: ${process.env.PORT}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurado' : 'No configurado'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'Configurado' : 'No configurado'}`);
// Configurar timeout global para pruebas
vitest_1.vi.setConfig({
    testTimeout: 30000, // Aumentar el timeout para pruebas e2e
});
// Inicializar cliente Prisma para pruebas
const prisma = new db_1.PrismaClient();
// Variables globales para pruebas
let isDbConnected = false;
// Configurar hooks globales para pruebas
(0, vitest_1.beforeAll)(async () => {
    try {
        // Verificar conexión a la base de datos
        await prisma.$connect();
        isDbConnected = true;
        console.log('✅ Conexión a la base de datos establecida para pruebas e2e');
        // Limpiar datos de prueba al inicio
        await cleanupTestData();
    }
    catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        throw error;
    }
});
(0, vitest_1.beforeEach)(() => {
    console.log('Iniciando prueba...');
});
(0, vitest_1.afterEach)(() => {
    console.log('Prueba finalizada');
});
(0, vitest_1.afterAll)(async () => {
    if (isDbConnected) {
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
    }
    console.log('✅ Pruebas e2e completadas');
});
// Función para limpiar datos de prueba
async function cleanupTestData() {
    if (!isDbConnected)
        return;
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
