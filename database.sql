CREATE DATABASE cutsession;

--\c cutsession

CREATE TABLE users(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob date NOT NULL,
    cityOfResidence VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL
);

CREATE TABLE merchants(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    cityOfOperation VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY NOT NULL,
    merchantId integer REFERENCES merchants,
    startsAt timestamptz NOT NULL,
    endsAt timestamptz NOT NULL,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE booking(
    id SERIAL PRIMARY KEY NOT NULL,
    bookingref text NOT NULL,
    userId integer REFERENCES users,
    sessionId integer REFERENCES sessions,
    date date NOT NULL,
    startsAt timestamptz NOT NULL,
    endsAt timestamptz NOT NULL,
    notes text NOT NULL,
    title text NOT NULL
);