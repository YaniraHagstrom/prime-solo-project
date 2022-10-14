
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


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
    "date_created" DATE NOT NULL CURRENT_TIMESTAMP
	);

-- Need to look up default icon --
CREATE TABLE children (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"icon" VARCHAR(250),
	"age" INT NOT NULL,
	"user_id" INT REFERENCES "user"
	);
	
CREATE TABLE therapies (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);
	
CREATE TABLE children_therapies (
	"id" SERIAL PRIMARY KEY,
	"child_id" INT REFERENCES "children"
	);
	
CREATE TABLE languages (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
	);
	
	
CREATE TABLE children_languages (
	"id" SERIAL PRIMARY KEY,
	"child_id" INT REFERENCES "children"
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
	
CREATE TABLE provider_therapies (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers"
	);
	

CREATE TABLE provider_languages (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers"
	);



	
	
	
	
	
	