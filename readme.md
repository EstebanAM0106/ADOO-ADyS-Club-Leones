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
   npm install
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
   node server.js
   ```

## Endpoints

### Inscripciones

- **GET /api/inscripciones**

  Obtiene todas las inscripciones.

- **POST /api/inscripciones**

  Registra una nueva inscripción.

  ```json
  {
    "ID_Evento": 1,
    "ID_Usuario": 1
  }
  ```

- **DELETE /api/inscripciones/:id**

  Elimina una inscripción.

### Usuarios

- **GET /api/usuarios**

  Obtiene todos los usuarios.

- **POST /api/usuarios**

  Registra un nuevo usuario.

  ```json
  {
    "Nombre": "Juan",
    "Apellido": "Pérez",
    "Genero": "masculino",
    "Fecha_Nacimiento": "1990-01-01",
    "Email": "juan.perez@example.com",
    "Password": "tu_contraseña",
    "Rol": "user"
  }
  ```

- **DELETE /api/usuarios/:id**

  Elimina un usuario.

### Sedes

- **GET /api/sedes**

  Obtiene todas las sedes.

- **POST /api/sedes**

  Registra una nueva sede.

  ```json
  {
    "Nombre": "Nueva Sede",
    "Ubicacion": "Ubicación de la sede"
  }
  ```

- **DELETE /api/sedes/:id**

  Elimina una sede.

### Registro de Tiempo

- **GET /api/registrotiempo**

  Obtiene todos los registros de tiempo.

- **POST /api/registrotiempo**

  Registra un nuevo tiempo.

  ```json
  {
    "ID_Evento": 1,
    "ID_Usuario": 1,
    "Tiempo": "01:30:00"
  }
  ```

- **DELETE /api/registrotiempo/:id**

  Elimina un registro de tiempo.

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
