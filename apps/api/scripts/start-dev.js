// Script para iniciar la API con variables de entorno cargadas desde el archivo .env raíz
const { spawn } = require('child_process');
const { resolve } = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env raíz
const envConfig = dotenv.config({ path: resolve(__dirname, '../../../.env') });

if (envConfig.error) {
  console.error('Error al cargar las variables de entorno:', envConfig.error);
  process.exit(1);
}

console.log('Variables de entorno cargadas:');
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'configurado' : 'no configurado'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'configurado' : 'no configurado'}`);

// Configurar el puerto específicamente para desarrollo
process.env.PORT = process.env.PORT || '3000';

// Iniciar NestJS con las variables de entorno ya cargadas
const nestBin = resolve(__dirname, '../node_modules/.bin/nest');
const nestProcess = spawn(nestBin, ['start', '--watch'], {
  stdio: 'inherit',
  env: process.env,
  shell: true
});

nestProcess.on('error', (error) => {
  console.error('Error al iniciar NestJS:', error);
  process.exit(1);
});

nestProcess.on('close', (code) => {
  console.log(`NestJS se cerró con código: ${code}`);
  process.exit(code);
});
