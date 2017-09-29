CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE monitors(
    id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6,2),
    size int,
	PRIMARY KEY(id)
);

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

CREATE TABLE TelevisionSet(

	id UUID DEFAULT uuid_generate_v1(),
	weight dec(4, 2),
	modelNumber varchar(20) UNIQUE,
	brand varchar(30),
	price dec(6, 2),
	dimensions varchar(20),
	type varchar(20),
	PRIMARY KEY(id)
);

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
	touchscreen bool
);