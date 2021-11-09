<a href="http://www.unpaz.edu.ar"><img src="https://www.unpaz.edu.ar/sites/default/files/unpaz_0.png" title="FVCproductions" alt="UNPAZ"></a>

# Empezando con sistema lavadero API

## Tabla de contenidos
- [Empezando](#Empezando)
- [Requerimientos](#Requerimientos)
- [Dependencias](#Dependencias)
- [Diseño](#Diseño)
- [Contacto](#Contacto)
 
 

### Empezando

Funciones disponibles:
* Operaciones crud
* Postgrsql para guardar usuarios
* Autenticación con passport
* JWT Tokens
* CORS disponible
* Protección de los headers con helmet
* Protección ante ataques de brute force con rate-limit
* Logging con morgan+rotación de archivos con rfs


 
### Requerimientos 

 - Nodejs  (v7 o superior) instalado
 - Postgrsql (v9.4 o superior) instalado

### Dependencias 

 - express
 - body-parser
 - nodemon
 - mongoose
 - pg
 - cors
 - multer
 - express-validator
 - bcrypt-nodejs
 - sequelize
 - passport
 - passport-local
 - Helmet
 - Morgan
 - rotating-file-stream
 - dotenv
 

### Diseño   
![screenshoot](https://i.ibb.co/YfbcRxQ/Express-REST-API-Struc.png)

Main layer     | Type   | Descripcion
--------------------- | -------------------- | ---------------------
HTTP logic layer | Routes + Controllers | Esta capa manejara las peticiones http y las routeara a su correspondiente controllador
Business logic layer | Services + Data Access | Contiene la logica de negocio asi como el acceso a nuestra base de datos  




### API endpoints


| Ruta          | Descripcion |
| -------------- | ----------- |
| **/login**       | Endpoint para autenticarse con usuario y contraseña |
| **/register**   | Endpoint para registrar un nuevo usuario |
| **/api-docs** | Endpoint para ver la documentación de swagger |

### Variables de entorno 
Crear un archivo .env con las siguientes variables :  

DB_USER=postgres  

DB_PASSWORD=admin  

DB_HOST=postgres  

DB_PORT=5432  

DB_DATABASE=test  

DB_DIALECT=postgres  

TOKEN_KEY=clavesupersecreta  

TOKEN_EXP=60  


### Uso  

Instalacion de dependencias :  

`npm install`  

Script para la creacion de las base de datos/tablas y datos iniciales :  

`npm run create-databases`

Para su ejecucion en el directorio del proyecto ejecutar :  

`npm start`  

### Contacto
Puedes enviar un mail a alguna de las siguientes direcciones : 

- fcorinaldesi@unpaz.edu.ar
- fernandocorinaldesi@hotmail.com
