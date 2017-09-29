# SOEN343

BackEnd:

How to install:

	0) Install git/git bash
	1) Install nodejs latest release
	2) Go to ./Backend in cmd or git bash
	3) run "npm install" to install dependencies. 
		-Every time a new dependencies is added you will have to run this command again.
		-When install new dependencies with npm install add --save so it will be added to package.json

How to build and run:

	0) Go to ./Backend in cmd or git bash
	1) run "npm run grunt" to compile
	2) run "npm start" to start the server
	
FrontEnd:

	1) npm install webpack -g
	2) npm install
	3) webpack
	4) npm start
DBSetup:
download newest version of postpressql.
use pg admin4 to make a db called DBpixelperformance with the superuser password being "admin"
Run the sql found in DBinitialization.sql
