CREATE DATABASE  IF NOT EXISTS `cursala`;
USE `cursala`;

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE cursos (
id int primary key not  null auto_increment,
 name VARCHAR(50),
 description VARCHAR(250),
 image varchar(100),
 length int,
 price int,
 categoryId int 
);

INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Reposteria sin Gluten', ' Rico y liviano','cocina.PNG', 100,1,100);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Cocina Italiana', ' Pizza, pasta, tiramisu','cocina.PNG', 200,1,130);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Cocina Francesa', 'Label rouge, maison Medoc','cocina.PNG', 300,1,132);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Masajes con aceite', ' Super relajante', 'estetica_masaje.PNG', 50,2,123);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Masaje terapeutico', ' Cura todo', 'estetica_masaje.PNG', 150,2,345);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Masaje Shiatsu', 'directamente de China','estetica_masaje.PNG', 250,2,456);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Desarollo 1', 'Primer nivel', 'carpinteria.png', 50,3,567);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('Desarollo 2', ' nivel experimentado','carpinteria.png', 150,3,458);
INSERT INTO cursos(name,description,image,length,categoryId,price) VALUES('desarollo 3', 'nivel master','carpinteria.png',  250,3,678);

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE categorias (
id int primary key not  null auto_increment,
 name VARCHAR(50) not null unique
);

INSERT INTO categorias VALUES(default, 'cocina internacional');
INSERT INTO categorias VALUES(default, 'bien estar');
INSERT INTO categorias VALUES(default, 'desarollo personal');

DROP TABLE IF EXISTS `users`;
CREATE TABLE users(
id int primary key not null auto_increment,
first_name varchar(50) not null,
email varchar (50) not null unique,
password varchar(200) not null,
avatar varchar(100),
typeId int);

INSERT INTO users VALUES(default,'Admin', 'admin@admin.com', '$2a$05$dwWa1gxvULbkWWJJjVxZrOXaoTxZcsQb7QmPRseuNqCq5T6ieMYHy','',2);

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE tokens(
id  int primary key not  null auto_increment,
userId varchar(50) not null,
token varchar(50) not null,
expiresAt DATE
);


