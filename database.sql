CREATE DATABASE cutsession;

--\c cutsession

CREATE TYPE user_type AS ENUM ('user', 'merchant');
CREATE TABLE clients(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(55) NOT NULL,
	email VARCHAR(55) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob date,
    city VARCHAR(20) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL
    accessType user_type
);

-- CREATE TABLE users(
-- 	id SERIAL PRIMARY KEY NOT NULL,
-- 	name VARCHAR(255) NOT NULL,
-- 	email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     dob date NOT NULL,
--     cityOfResidence VARCHAR(255) NOT NULL,
--     phoneNumber VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE merchants(
-- 	id SERIAL PRIMARY KEY NOT NULL,
-- 	name VARCHAR(255) NOT NULL,
-- 	email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     phoneNumber VARCHAR(255) NOT NULL
-- );

CREATE TYPE session_type AS ENUM ('weekDay', 'weekEnd');
CREATE TABLE sessions(
    id SERIAL PRIMARY KEY NOT NULL,
    merchantId integer REFERENCES clients,
    startsAt timestamptz NOT NULL,
    endsAt timestamptz NOT NULL,
    type session_type
);

CREATE TABLE booking(
    id SERIAL PRIMARY KEY NOT NULL,
    bookingref VARCHAR(15) NOT NULL,
    userId integer REFERENCES clients,
    sessionId integer REFERENCES sessions,
    date date NOT NULL,
    startsAt timestamptz NOT NULL,
    endsAt timestamptz NOT NULL,
    notes text NOT NULL,
    title VARCHAR(120) NOT NULL
);