CREATE DATABASE club_de_leonesv2;

show databases;

USE club_de_leonesv2;

-- Crear la tabla Sede
CREATE TABLE Sede (
    ID_Sede INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Ubicacion VARCHAR(255),
    PRIMARY KEY (ID_Sede)
);

-- Crear la tabla Competidor
CREATE TABLE Competidor (
    ID_Competidor INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Genero CHAR(1),
    Fecha_Nacimiento DATE,
    Categoria VARCHAR(50),
    Sede VARCHAR(50),
    ID_Sede INT,
    PRIMARY KEY (ID_Competidor),
    FOREIGN KEY (ID_Sede) REFERENCES Sede(ID_Sede) ON DELETE SET NULL
);

-- Crear la tabla Evento
CREATE TABLE Evento (
    ID_Evento INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Fecha_Convocatoria DATE,
    Fecha_Inicio_Inscripciones DATE,
    Fecha_Cierre_Inscripciones DATE,
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    Modalidad VARCHAR(100),
    Costo DECIMAL(10, 2),
    Requisitos TEXT,
    Reglas TEXT,
    Horarios VARCHAR(255),
    ID_Sede INT,
    PRIMARY KEY (ID_Evento),
    FOREIGN KEY (ID_Sede) REFERENCES Sede(ID_Sede) ON DELETE SET NULL
);

-- Crear la tabla Instructor
CREATE TABLE Instructor (
    ID_Instructor INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Especialidad VARCHAR(255),
    Privilegios BOOLEAN,
    PRIMARY KEY (ID_Instructor)
);

-- Crear la tabla Responsable
CREATE TABLE Responsable (
    ID_Responsable INT NOT NULL AUTO_INCREMENT,
    ID_Evento INT NOT NULL,
    ID_Instructor INT NOT NULL,
    Rol VARCHAR(100),
    PRIMARY KEY (ID_Responsable),
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento) ON DELETE CASCADE,
    FOREIGN KEY (ID_Instructor) REFERENCES Instructor(ID_Instructor) ON DELETE CASCADE
);

-- Crear la tabla Inscripcion
CREATE TABLE Inscripcion (
    ID_Inscripcion INT NOT NULL AUTO_INCREMENT,
    ID_Evento INT NOT NULL,
    ID_Usuario INT NOT NULL,
    Fecha_Inscripcion DATE,
    Nombre_Inscripcion VARCHAR(255),
    PRIMARY KEY (ID_Inscripcion),
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento) ON DELETE CASCADE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE CASCADE
);

-- Crear la tabla Sesion
CREATE TABLE Sesion (
    ID_Sesion INT NOT NULL AUTO_INCREMENT,
    Hora TIME,
    Descripcion TEXT,
    Motivo TEXT,
    ID_Evento INT,
    PRIMARY KEY (ID_Sesion),
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento) ON DELETE CASCADE
);

-- Crear la tabla Datos_Competidor
CREATE TABLE Datos_Competidor (
    ID_Datos INT NOT NULL AUTO_INCREMENT,
    Distancia DECIMAL(10, 2),
    Fecha DATE,
    Tiempo TIME,
    ID_Sesion INT,
    ID_Competidor INT,
    PRIMARY KEY (ID_Datos),
    FOREIGN KEY (ID_Sesion) REFERENCES Sesion(ID_Sesion) ON DELETE CASCADE,
    FOREIGN KEY (ID_Competidor) REFERENCES Competidor(ID_Competidor) ON DELETE CASCADE
);

-- Crear la tabla Premiacion
CREATE TABLE Premiacion (
    ID_Premiacion INT NOT NULL AUTO_INCREMENT,
    Lugar_Obtenido VARCHAR(50),
    Merito VARCHAR(255),
    Distancia_KM DECIMAL(10, 2),
    Nombre_Evento VARCHAR(255),
    Fecha DATE,
    ID_Competidor INT,
    PRIMARY KEY (ID_Premiacion),
    FOREIGN KEY (ID_Competidor) REFERENCES Competidor(ID_Competidor) ON DELETE CASCADE
);

CREATE TABLE Usuarios (
    ID_Usuario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Rol ENUM('user', 'admin') NOT NULL,
    PRIMARY KEY (ID_Usuario)
);

INSERT INTO Usuarios (Nombre, Apellido, Email, Password, Rol) VALUES
('Juan', 'Perez', 'juan.user@example.com', 'usuario', 'user'),
('Maria', 'Gomez', 'maria.admin@example.com', 'admin', 'admin');

SELECT * FROM Sede;

INSERT INTO Sede (Nombre, Ubicacion) VALUES ('Sede Principal', 'Ubicación Principal');

SELECT * FROM Evento;

select * from Usuarios;
select * from Datos_Competidor;
select * from Sesion;
select * from Premiacion;
select * from Inscripcion;
select * from Competidor;
drop table Premiacion;
drop table Sesion;
drop table Datos_Competidor;
drop table Responsable;
drop table Instructor;
drop table Inscripcion;