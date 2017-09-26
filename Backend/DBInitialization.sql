CREATE TABLE monitors (
    id int,
	weight double,
	modelNumber varchar(20),
	brand varchar(30),
	price dec(6,2),
    size int,
);
ALTER TABLE monitors 
   ADD CONSTRAINT PK_monitors PRIMARY KEY ID;