// Interfaz principal que define la estructura de un país
// Basada en la respuesta de la API REST Countries (https://restcountries.com)
export interface Country {
  name: Name;           // Objeto complejo con diferentes nombres del país
  cca3: string;         // Código Alpha-3 del país (ej: 'ESP', 'USA', 'FRA')
  borders: string[];    // Array de códigos Alpha-3 de países fronterizos
}

// Interfaz que define los diferentes nombres de un país
// La API proporciona nombres en múltiples idiomas y formatos
export interface Name {
  common: string;       // Nombre común del país (ej: "Spain", "France")
  official: string;     // Nombre oficial completo (ej: "Kingdom of Spain")
  nativeName: { [key: string]: NativeName }; // Nombres nativos indexados por código de idioma
}

// Interfaz para los nombres nativos del país
// Cada idioma tiene tanto el nombre oficial como el común en su idioma nativo
export interface NativeName {
  official: string;     // Nombre oficial en el idioma nativo
  common: string;       // Nombre común en el idioma nativo
}
