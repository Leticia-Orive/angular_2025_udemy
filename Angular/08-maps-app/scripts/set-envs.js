


/**
 * Script para configurar variables de entorno en Angular
 *
 * PROPÓSITO:
 * Este script automatiza la creación de archivos de configuración de entorno
 * para Angular, tomando variables sensibles del archivo .env y generando
 * los archivos environment.ts necesarios para la aplicación.
 *
 * ¿POR QUÉ ES NECESARIO?
 * - Angular no puede leer directamente archivos .env
 * - Las variables de entorno deben estar en archivos TypeScript
 * - Evita exponer claves API directamente en el código fuente
 * - Permite diferentes configuraciones para desarrollo y producción
 */

// Importa funciones del sistema de archivos de Node.js
const {writeFileSync, mkdirSync} = require('fs')

// Carga las variables de entorno desde el archivo .env
// OPCIÓN 1: Con logs informativos (actual)
require('dotenv').config();

// OPCIÓN 2: Sin logs informativos (descomenta la línea siguiente y comenta la anterior)
// require('dotenv').config({ quiet: true });

// Rutas donde se generarán los archivos de configuración de Angular
const targetPath = './src/environments/environment.ts';           // Para producción
const targetPathDev = './src/environments/environment.development.ts'; // Para desarrollo

/**
 * Validación de variables de entorno requeridas
 *
 * VALIDACIÓN CRÍTICA:
 * Verifica que la variable MAPBOX_KEY esté definida en el archivo .env
 * Si no existe, detiene la ejecución con un error claro
 *
 * IMPORTANCIA:
 * Mapbox requiere una clave API válida para funcionar
 * Sin esta clave, los mapas no se cargarán en la aplicación
 */
if(!process.env['MAPBOX_KEY']){
  throw new Error("No MAPBOX_KEY env variable set")
}

/**
 * Contenido del archivo de configuración de Angular
 *
 * QUÉ GENERA:
 * Crea el contenido TypeScript que Angular puede importar y usar
 * La variable MAPBOX_KEY del .env se inyecta en el objeto environment
 *
 * ESTRUCTURA:
 * - export const environment: Hace el objeto disponible para importar
 * - mapboxkey: Contiene la clave API de Mapbox desde las variables de entorno
 *
 * USO EN ANGULAR:
 * import { environment } from './environments/environment';
 * const apiKey = environment.mapboxkey;
 */
const envFileContent = `
export const environment = {
  mapboxkey: "${process.env['MAPBOX_KEY']}",
};
`;
/**
 * MÉTODO ALTERNATIVO DE VALIDACIÓN:
 * Otra forma más explícita de validar la variable de entorno
 *
 * const mapboxKey = process.env['MAPBOX_KEY']
 * if(!mapboxKey){
 *   throw new Error("No MAPBOX_KEY env variable set")
 * };
 *
 * DIFERENCIAS:
 * - Más verboso pero más claro
 * - Almacena la clave en una constante intermedia
 * - Mismo resultado final
 */

/**
 * Creación de archivos de configuración
 *
 * PROCESO:
 * 1. mkdirSync: Crea el directorio /src/environments si no existe
 *    - recursive: true permite crear directorios anidados
 *
 * 2. writeFileSync: Escribe el contenido en ambos archivos
 *    - environment.ts: Para builds de producción
 *    - environment.development.ts: Para desarrollo local
 *
 * RESULTADO:
 * Angular tendrá acceso a la clave de Mapbox de forma segura
 * sin exponer credenciales en el código fuente
 */
mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
