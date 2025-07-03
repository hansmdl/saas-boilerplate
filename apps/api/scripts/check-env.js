// Script para verificar que las variables de entorno se cargan correctamente
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

console.log('== VERIFICACIÓN DE VARIABLES DE ENTORNO ==');
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'no definido'}`);
console.log(`- PORT: ${process.env.PORT || 'no definido'}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'configurado' : 'no configurado'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'configurado' : 'no configurado'}`);

// Verificar JWT_SECRET (crítico para autenticación)
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está configurado. Es necesario para la autenticación.');
  process.exit(1);
}

// Verificar DATABASE_URL (crítico para la conexión a la base de datos)
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL no está configurado. Es necesario para la conexión a la base de datos.');
  process.exit(1);
}

console.log('✅ Todas las variables de entorno críticas están configuradas correctamente.');
process.exit(0);
