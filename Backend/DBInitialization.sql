CREATE DATABASE IF NOT EXISTS "DBpixelperformance";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS monitors;
CREATE TABLE monitors(
    id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6,2),
    size int,
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS desktops;
CREATE TABLE desktops(
	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6, 2),
	processor varchar(20),
	ram int,
	cpus int,
	hardDrive int,
	os varchar(15),
	dimensions varchar(20),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS tablets;
CREATE TABLE tablets(
    id UUID DEFAULT uuid_generate_v1(),
    weight dec(4,2),
    modelNumber varchar(20) UNIQUE,
    brand varchar(30),
    price dec(6,2),
    processor varchar(20),
    ram int,
    cpus int,
    hardDrive int,
    os varchar(15),
    displaySize dec(3,1),
    dimensions varchar(20),
    battery int,
    camera bool,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS laptops;
CREATE TABLE laptops(
	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4,2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6,2),
	processor varchar(20),
	ram int,
	cpus int,
	hardDrive int,
	os varchar(15),
	displaySize dec(3,1),
	battery int,
	camera bool,
	touchscreen bool,
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS televisionsets;
CREATE TABLE televisionsets(

	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6, 2),
	dimensions varchar(20),
	type varchar(20),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins(

	id UUID DEFAULT uuid_generate_v1(),
	fname varchar(20),
	lname varchar(20),
	email varchar(30),
	password CHAR(128),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS clients;
CREATE TABLE clients(

	id UUID DEFAULT uuid_generate_v1(),
	fname varchar(20),
	lname varchar(20),
	email varchar(30),
	password CHAR(128),
	address varchar(30),
	phone varchar(30),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS inventories;
CREATE TABLE inventories(
	"serialNumber" UUID DEFAULT uuid_generate_v1(),
	"electronicID" UUID,
	PRIMARY KEY("serialNumber")
);
