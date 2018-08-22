# Instalación
## 

    cd server
    npm i
    cd ../multiwireless
    npm i

## 

Importar el archivo sql a la bd (el archivo se encuentra en server/multiwireless_2018-08-21.sql.zip), notar que esta comprimido en zip y dentro esta el sql (para ahorrar espacio en la subida). 

Configurar sequalizeConnect.js con los datos correctos para la bd mysql.

# Ejecución

## En la primera terminal
    cd server
    npm run start:server
    
## En la segunda terminal
    cd multiwireless
    ng serve

# Usuarios de prueba
## Gerente
    gerente@c.com
    123
## Analista
    analista@c.com
    123
## Jefe de Flota
    jefeflota@c.com
    123