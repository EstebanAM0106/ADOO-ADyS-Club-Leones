CREATE DATABASE club_de_leonesv2;

show databases;

USE club_de_leonesv2;

CREATE TABLE RegistroTiempo (
    ID_Registro INT NOT NULL AUTO_INCREMENT,
    ID_Evento INT NOT NULL,
    ID_Usuario INT NOT NULL,
    Tiempo TIME NOT NULL,
    PRIMARY KEY (ID_Registro),
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento) ON DELETE CASCADE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE CASCADE
);

CREATE TABLE Usuarios (
    ID_Usuario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Genero ENUM('masculino', 'femenino', 'otro') NOT NULL,
    Fecha_Nacimiento DATE NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Rol ENUM('user', 'admin') NOT NULL,
    PRIMARY KEY (ID_Usuario)
);

CREATE TABLE Inscripcion (
    ID_Inscripcion INT NOT NULL AUTO_INCREMENT,
    ID_Evento INT NOT NULL,
    ID_Usuario INT NOT NULL,
    PRIMARY KEY (ID_Inscripcion),
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento) ON DELETE CASCADE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE CASCADE
);

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

CREATE TABLE Sede (
    ID_Sede INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Ubicacion VARCHAR(255),
    PRIMARY KEY (ID_Sede)
);

SELECT * FROM Evento;

select * from Usuarios;
select * from Datos_Competidor;
select * from Sesion;
select * from Premiacion;
select * from Inscripcion;
select * from Competidor;
drop table Premiacion;
