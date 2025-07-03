import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from 'db';
import { afterAll, beforeAll, beforeEach, afterEach, vi } from 'vitest';

// Configurar variables de entorno específicas para pruebas
process.env.PORT = '3333'; // Puerto diferente para pruebas
// Nota: No podemos modificar NODE_ENV directamente ya que es de solo lectura

// Cargar variables de entorno desde el archivo .env raíz
config({ path: resolve(__dirname, '../../../.env') });

// Verificar que las variables de entorno críticas estén cargadas
console.log('Variables de entorno cargadas para pruebas e2e:');
console.log(`- PORT: ${process.env.PORT}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurado' : 'No configurado'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'Configurado' : 'No configurado'}`);

// Configurar timeout global para pruebas
vi.setConfig({
  testTimeout: 30000, // Aumentar el timeout para pruebas e2e
});

// Inicializar cliente Prisma para pruebas
const prisma = new PrismaClient();

// Variables globales para pruebas
let isDbConnected = false;

// Configurar hooks globales para pruebas
beforeAll(async () => {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    isDbConnected = true;
    console.log('✅ Conexión a la base de datos establecida para pruebas e2e');
    
    // Limpiar datos de prueba al inicio
    await cleanupTestData();
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    throw error;
  }
});

beforeEach(() => {
  console.log('Iniciando prueba...');
});

afterEach(() => {
  console.log('Prueba finalizada');
});

afterAll(async () => {
  if (isDbConnected) {
    try {
      // Limpiar datos de prueba
      await cleanupTestData();
      
      // Cerrar conexión
      await prisma.$disconnect();
      console.log('✅ Conexión a la base de datos cerrada después de pruebas e2e');
    } catch (error) {
      console.error('❌ Error al desconectar de la base de datos:', error);
    }
  }
  console.log('✅ Pruebas e2e completadas');
});

// Función para limpiar datos de prueba
async function cleanupTestData() {
  if (!isDbConnected) return;
  
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
  } catch (error) {
    console.error('❌ Error al limpiar datos de prueba:', error);
  }
}
