# Scripts de Base de Datos

## Instrucciones para configurar MySQL

### 1. Instalar MySQL
Si no tienes MySQL instalado, descárgalo desde:
https://dev.mysql.com/downloads/mysql/

### 2. Crear la base de datos
Abre MySQL Workbench o la línea de comandos de MySQL y ejecuta:

```bash
mysql -u root -p < schema.sql
```

O copia y pega el contenido del archivo `schema.sql` en MySQL Workbench.

### 3. Configurar credenciales
En el backend, copia el archivo `.env.example` a `.env` y configura:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_de_mysql
DB_NAME=fullstack_db
DB_PORT=3306
```

## Verificar la conexión

```sql
USE fullstack_db;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products;
```
