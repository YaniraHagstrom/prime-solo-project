-- DROP TABLE IF EXISTS country;
-- DROP TABLE IF EXISTS city;
-- DROP TABLE IF EXISTS "user";
-- DROP TABLE IF EXISTS children;
-- DROP TABLE IF EXISTS services;
-- DROP TABLE IF EXISTS children_services;
-- DROP TABLE IF EXISTS languages;
-- DROP TABLE IF EXISTS children_languages;
-- DROP TABLE IF EXISTS providers;
-- DROP TABLE IF EXISTS providers_services;



CREATE TABLE country (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);
	
CREATE TABLE city (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"country_id" INT REFERENCES "country"
	);

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
	
CREATE TABLE children_services (
	"id" SERIAL PRIMARY KEY,
	"child_id" INT REFERENCES "children",
	"service_id" INT REFERENCES "services"
	);
--	
CREATE TABLE languages (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);
	
	
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
	"city_id" INT REFERENCES "city",
	"country_id" INT REFERENCES "country",
	"min_age" INT NOT NULL,
	"max_age" INT NOT NULL
	);
	
CREATE TABLE provider_services (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers"
	"service_id" INT REFERENCES "services"
	);
	


CREATE TABLE provider_languages (
	"id" SERIAL PRIMARY KEY,
	"language_id" INT REFERENCES "languages",
	"provider_id" INT REFERENCES "providers"
	);


INSERT INTO services ("name")
	VALUES 
		('Speech Therapy'),
		('Ocupational Therapy'),
		('Physical Therapy'),
		('Cognitive Behavior Therapy'),
		('Feeding Therapy'),
		('Joint Attention Therapy'),
		('Early Intervention'),
		('Parent-mediated Therapy'),
		('Social Skills Training'),
		('Behavioral Management Therapy');
		
INSERT INTO languages ("name")
	VALUES
		('Bulgarian'),
		('Croatian'),
		('Czech'),
		('Danish'),
		('Dutch'),
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
	
	
	
	
	
	