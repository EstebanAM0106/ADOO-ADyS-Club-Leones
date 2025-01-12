# Club de Leones API

Este proyecto es una API para gestionar eventos, inscripciones, usuarios, sedes y registros de tiempo del Club de Leones. La API permite a los usuarios autenticarse, ver eventos, inscribirse en eventos, gestionar usuarios y sedes, y registrar tiempos asociados a eventos.

## Requisitos

- **Node.js** (v14 o superior)
- **Express** (v4 o superior)
- **Sequelize** (v6 o superior)
- **dotenv** (v8 o superior)
- **jsonwebtoken** (v8 o superior)
- **bcryptjs** (v2 o superior)
- **cors** (v2 o superior)
- **nodemon** (v2 o superior)

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone https://github.com/EstebanAM0106/ADOO-ADyS-Club-Leones.git
   cd ADOO-ADyS-Club-Leones
   ```

2. Instala las dependencias:

   ```sh
   node server.js
   ```

3. Configura la base de datos:

   - Crea una base de datos en MySQL.
   - Importa el esquema de la base de datos (asegúrate de tener las tablas `Usuarios`, `Evento`, `Sede`, `Competidor`, `Instructor`, `Inscripcion`, `Sesion`, `Datos_Competidor`, `Premiacion`).

4. Configura las variables de entorno:

   Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto con el siguiente contenido:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=club_de_leonesv2
   PORT=5000
   ```

5. Inicia el servidor:

   ```sh
   npm start
   ```

## Endpoints

### Autenticación

- **POST /api/login**

  Autentica a un usuario y devuelve un token JWT.

  ```json
  {
    "email": "tu_email@example.com",
    "password": "tu_contraseña"
  }
  ```

### Eventos

- **GET /api/eventos**

  Obtiene todos los eventos.

- **POST /api/eventos**

  Registra un nuevo evento (solo para administradores).

  ```json
  {
    "Nombre": "Nuevo Evento",
    "Fecha_Convocatoria": "2023-10-01",
    "Fecha_Inicio_Inscripciones": "2023-10-05",
    "Fecha_Cierre_Inscripciones": "2023-10-10",
    "Fecha_Inicio": "2023-10-15",
    "Fecha_Fin": "2023-10-20",
    "Modalidad": "Presencial",
    "Costo": 100.0,
    "Requisitos": "Requisitos del evento",
    "Reglas": "Reglas del evento",
    "Horarios": "Horarios del evento",
    "ID_Sede": 1
  }
  ```

- **PUT /api/eventos/:id**

  Actualiza un evento existente (solo para administradores).

  ```json
  {
    "Nombre": "Evento Actualizado",
    "Fecha_Convocatoria": "2023-10-01",
    "Fecha_Inicio_Inscripciones": "2023-10-05",
    "Fecha_Cierre_Inscripciones": "2023-10-10",
    "Fecha_Inicio": "2023-10-15",
    "Fecha_Fin": "2023-10-20",
    "Modalidad": "Presencial",
    "Costo": 150.0,
    "Requisitos": "Requisitos actualizados del evento",
    "Reglas": "Reglas actualizadas del evento",
    "Horarios": "Horarios actualizados del evento",
    "ID_Sede": 1
  }
  ```

- **DELETE /api/eventos/:id**

  Elimina un evento (solo para administradores).

### Actividades

- **GET /api/actividades**

  Obtiene todas las actividades (excluyendo las eliminadas).

- **POST /api/actividades**

  Registra una nueva actividad.

  ```json
  {
    "nombre": "Nueva Actividad",
    "descripcion": "Descripción de la actividad",
    "fecha": "2023-10-01",
    "usuario_id": 1
  }
  ```

- **DELETE /api/actividades/:id**

  Elimina una actividad (soft delete).

## Middleware

### Autenticación y Autorización

- **authenticateToken**

  Middleware para autenticar un token JWT.

- **authorizeRole**

  Middleware para autorizar roles específicos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
