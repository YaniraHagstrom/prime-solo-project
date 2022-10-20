-- DROP TABLE IF EXISTS children_languages;
-- DROP TABLE IF EXISTS children_services;
-- DROP TABLE IF EXISTS providers_services;
-- DROP TABLE IF EXISTS providers_languages;
-- DROP TABLE IF EXISTS languages;
-- DROP TABLE IF EXISTS services;
-- DROP TABLE IF EXISTS children;
-- DROP TABLE IF EXISTS "user";
-- DROP TABLE IF EXISTS providers;
-- DROP TABLE IF EXISTS city;
-- DROP TABLE IF EXISTS country;

CREATE EXTENSION IF NOT EXISTS tablefunc;

CREATE TABLE country (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);

INSERT INTO 
	country ("name")
VALUES
	('Austria'),
	('Belgium'),
	('Bulgaria'),
	('Croatia'),
	('Republic of Cyprus'),
	('Czech Republic'),
	('Denmark'),
	('Estonia'),
	('Finland'),
	('France'),
	('Germany'),
	('Greece'),
	('Hungary'),
	('Ireland'),
	('Italy'),
	('Latvia'),
	('Lithuania'),
	('Luxembourg'),
	('Malta'),
	('Netherlands'),
	('Poland'),
	('Portugal'),
	('Romania'),
	('Slovakia'),
	('Slovenia'),
	('Spain'),
	('Sweden');

	
CREATE TABLE city (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"country_id" INT REFERENCES "country"
	);

INSERT INTO 
	city ("name", country_id)
VALUES
	('Lisbon', 22),
	('Porto', 22),
	('Villa nova de Gaia', 22),
	('Amadora', 22),
	('Braga', 22),
	('Funchal', 22),
	('Queluz', 22),
	('Coimbra', 22),
	('Setubal', 22),
	('Almada', 22);


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "city_id" INT REFERENCES "city",
    "country_id" INT REFERENCES "country",
    "date_created" DATE DEFAULT CURRENT_TIMESTAMP
	);

CREATE TABLE children (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"icon" VARCHAR(250),
	"age" INT NOT NULL,
	"user_id" INT REFERENCES "user"
	);
	

CREATE TABLE services (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);

INSERT INTO 
	services ("name")
VALUES
	('Early Intervention'),
	('Speech Therapy'),
	('Ocupational Therapy'),
	('Physical Therapy'),
	('Parent-mediated Therapy'),
	('Joint Attention Therapy'),
	('Social Skills Training'),
	('Behavioral Management Therapy'),
	('Feeding Therapy'),
	('Cognitive Behavior Therapy');

	
CREATE TABLE children_services (
	"id" SERIAL PRIMARY KEY,
	"child_id" INT REFERENCES "children",
	"service_id" INT REFERENCES "services",
	"checked" BOOLEAN
	);
--	
CREATE TABLE languages (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);
	
INSERT INTO 
	languages ("name")
VALUES
	('Bulgarian'),
	('Croatian'),
	('Czech'),
	('Dutch'),
	('Danish'),
	('English'),
	('Estonian'),
	('Finnish'),
	('French'),
	('German'),
	('Greek'),
	('Hungarian'),
	('Irish'),
	('Italian'),
	('Latvian'),
	('Lithuanian'),
	('Maltese'),
	('Polish'),
	('Portuguese'),
	('Romanian'),
	('Slovak'),
	('Slovenian'),
	('Spanish'),
	('Swedish');
	
CREATE TABLE children_languages (
	"id" SERIAL PRIMARY KEY,
	"child_id" INT REFERENCES "children",
	"language_id" INT REFERENCES "languages"
	);
	
CREATE TABLE providers (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(150) NOT NULL,
	"icon" VARCHAR(300),
	"country_id" INT REFERENCES "country",
	"city_id" INT REFERENCES "city",
	"min_age" INT NOT NULL,
	"max_age" INT NOT NULL,
	"language_id1" INT NOT NULL,
	"language_id2" INT
	);

insert into 
	providers (first_name, last_name, icon, country_id, city_id, min_age, max_age, language_id1, language_id2) 
values 
	('Lishe', 'Bergin', null, 23, 1, 0, 10, 23, 5),
	('Alden', 'Hathorn', null, 23, 1, 0, 10, 23, 6),
	('Alisha', 'Jelphs', null, 23, 1, 0, 10, 23, 5),
	('Fianna', 'Gierke', null, 23, 1, 0, 10, 23, 23),
	('Urbano', 'Coventon', null, 23, 1, 0, 10, 23, 1),
	('Adelheid', 'Espinha', null, 23, 1, 0, 10, 23, 19),
	('Alissa', 'Larcombe', null, 23, 1, 0, 10, 23, 4),
	('Cirstoforo', 'Guilford', null, 23, 1, 0, 10, 23, 7),
	('Ingelbert', 'Allsepp', null, 23, 1, 0, 10, 23, 7),
	('Jakob', 'Fealty', null, 23, 1, 0, 10, 23, 23),
	('Georas', 'Huelin', null, 23, 1, 0, 10,23, 14 ),
	('Arielle', 'Teers', null, 23, 1, 0, 10,23, 3 ),
	('Trevor', 'Karoly', null, 23, 1, 0, 10, 23, 22),
	('Theresa', 'Josipovitz', null, 23, 1, 0, 10,23, 16 ),
	('Torrence', 'Matyasik', null, 23, 1, 0, 10, 23, 5),
	('Alick', 'Bowmer', null, 23, 1, 0, 10, 23, 4),
	('Crichton', 'Kienlein', null, 23, 1, 0, 10,23, 1 ),
	('Ashely', 'Ferraretto', null, 23, 1, 0, 10, 23, 10),
	('Rorie', 'Lister', null, 23, 1, 0, 10,23, 12 ),
	('Banky', 'Dyott', null, 23, 1, 0, 10,23, 4 ),
	('Desiree', 'Hagston', null, 23, 1, 0, 10,23, 12 ),
	('Adolphe', 'Wyss', null, 23, 1, 0, 10, 23, 23),
	('Rhetta', 'Jedrachowicz', null, 23, 1, 0, 10, 23, 6),
	('Elyse', 'Kilby', null, 23, 1, 0, 10,23, 15 ),
	('Marylynne', 'Biasi', null, 23, 1, 0, 10,23, 22 ),
	('Florance', 'Croom', null, 23, 1, 0, 10,6, 1 ),
	('Blondie', 'Caruth', null, 23, 1, 0, 10,6, 2 ),
	('Den', 'Coyett', null, 23, 1, 0, 10,6, 8 ),
	('Dita', 'Soaper', null, 23, 1, 0, 10,6, 7 ),
	('Cairistiona', 'Skipsea', null, 23, 1, 0, 10,6, 17 ),
	('Travis', 'Wharin', null, 23, 1, 0, 10,6, 6 ),
	('Carlen', 'Steel', null, 23, 1, 0, 10,6, 1 ),
	('Daphne', 'Angelo', null, 23, 1, 0, 10, 6, 17),
	('Maury', 'Rosell', null, 23, 1, 0, 10,6, 4 ),
	('Elwira', 'Speachley', null, 23, 1, 0, 10, 6, 20),
	('Aland', 'Stoggles', null, 23, 1, 0, 10,6, 11 ),
	('Sianna', 'Cordero', null, 23, 1, 0, 10,6, 23 ),
	('Lauren', 'McConville', null, 23, 1, 0, 10,6, 11 ),
	('Shirl', 'Sill', null, 23, 1, 0, 10,6, 12 ),
	('Bobbie', 'Weekly', null, 23, 1, 0, 10, 6, 2),
	('Jamie', 'Corsan', null, 23, 1, 0, 10,6, 18 ),
	('Stu', 'Fynes', null, 23, 1, 0, 10,6, 4),
	('Major', 'Trillow', null, 23, 1, 0, 10, 6, 13),
	('Dara', 'Brigdale', null, 23, 1, 0, 10,6, 20),
	('Christie', 'Houndson', null, 23, 1, 0, 10,6, 15 ),
	('Goldi', 'Komorowski', null, 23, 1, 0, 10,6, 5 ),
	('Brigg', 'Hedger', null, 23, 1, 0, 10, 6, 19),
	('Bekki', 'Daugherty', null, 23, 1, 0, 10,6, 10 ),
	('Margery', 'Skellern', null, 23, 1, 0, 10, 6, 20),
	('Marty', 'Wreight', null, 23, 1, 0, 10,6, 12 );

-- ** PROVIDERS_SERVICES ** --
CREATE TABLE providers_services (
	provider_id INT NOT NULL,
	"1" BOOLEAN,
	"2" BOOLEAN, 
	"3" BOOLEAN, 
	"4" BOOLEAN, 
	"5" BOOLEAN, 
	"6" BOOLEAN, 
	"7" BOOLEAN, 
	"8" BOOLEAN, 
	"9" BOOLEAN, 
	"10" BOOLEAN);

insert into 
	providers_services (provider_id, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10") 
values 
	(1, false, false, false, true, false, true, true, false, true, false),
	(2, true, false, true, true, false, false, true, true, false, false),
	(3, true, true, true, false, true, true, false, true, false, false),
	(4, true, true, false, false, false, true, false, false, true, true),
	(5, false, false, true, false, true, false, false, true, false, false),
	(6, true, false, false, false, true, true, true, true, true, false),
	(7, true, false, false, false, true, false, true, true, false, true),
	(8, false, true, false, false, true, true, true, true, false, true),
	(9, false, false, true, true, false, false, true, true, false, true),	
	(10, false, false, false, false, false, true, false, false, false, false),
	(11, false, false, false, true, true, false, true, false, false, true),
	(12, true, true, false, true, false, true, false, false, true, true),
	(13, false, false, false, false, false, true, true, false, true, false),
	(14, true, true, false, false, false, false, true, true, true, false),
	(15, false, true, false, true, false, true, false, false, true, false),
	(16, true, true, false, true, true, true, true, true, false, false),
	(17, true, true, false, false, true, true, false, true, false, true),
	(18, false, true, false, true, false, false, true, false, false, false),
	(19, true, false, true, false, false, true, true, false, true, false),
	(20, true, true, false, true, false, true, true, true, false, false),
	(21, false, false, true, false, true, true, false, true, false, true),
	(22, false, true, true, true, true, false, true, true, false, false),
	(23, true, false, false, false, false, true, false, false, true, false),
	(24, true, false, true, true, true, false, true, false, true, true),
	(25, false, false, true, false, false, true, true, true, true, true),
	(26, false, true, true, true, true, true, true, true, false, false),
	(27, false, false, true, false, false, true, true, false, true, false),
	(28, true, false, false, true, false, true, false, true, true, true),
	(29, false, true, false, false, true, false, true, true, true, true),
	(30, false, false, false, false, false, true, true, false, true, false),
	(31, false, false, false, true, true, true, true, true, false, true),
	(32, true, false, true, false, true, true, true, false, false, true),
	(33, false, false, false, false, true, true, false, false, true, false),
	(34, true, false, false, false, false, false, true, true, true, true),
	(35, true, false, false, true, false, false, false, true, true, false),
	(36, false, false, false, true, false, true, true, false, true, true),
	(37, true, true, false, false, false, true, true, false, true, true),
	(38, false, true, false, true, true, true, true, true, true, true),
	(39, false, true, true, true, false, false, false, false, false, false),
	(40, false, true, true, true, true, false, false, false, false, true),
	(41, true, false, false, true, false, true, true, true, false, false),
	(42, true, true, false, true, false, true, false, false, true, false),
	(43, true, false, true, true, false, true, false, true, true, true),
	(44, true, true, false, true, true, false, false, false, true, false),
	(45, false, true, true, true, false, false, true, false, false, true),
	(46, false, false, true, false, true, true, true, true, true, false),
	(47, false, true, true, false, false, false, true, true, false, true),
	(48, false, true, false, false, true, false, false, true, false, true),
	(49, true, false, true, false, true, false, true, true, false, true),
	(50, false, false, true, false, true, false, true, false, false, true);
	





