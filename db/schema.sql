DROP DATABASE IF EXISTS `burgers_db`;
create database burgers_db;
USE burgers_db;
USE z5c5dy5399b7z3vf;

create table burgers (

	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
