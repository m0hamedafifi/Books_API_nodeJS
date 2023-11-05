-- DROP SCHEMA bms;

CREATE SCHEMA bms AUTHORIZATION postgres;

SET search_path TO bms, public;

-- bms.book definition

-- Drop table

-- DROP TABLE bms.book;

-- Create table book
CREATE TABLE bms.book (
	book_id serial4 NOT NULL,
	book_title varchar(300) NOT NULL,
	description varchar(1000) NULL,
	store_code varchar(300) NULL,
	publisher varchar(300) NULL,
	author varchar(300) NULL,
	pages numeric NULL,
	created_on timestamp NOT NULL,
	created_by varchar(200) NOT NULL,
	in_stock bool NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

-- Create table store

CREATE TABLE bms.store (
	store_id serial4 NOT NULL,
	store_name varchar(100) NOT NULL,
	description varchar(1000) NULL,
	store_code varchar(7) NULL,
	created_on timestamp NOT NULL,
	created_by varchar(200) NOT NULL,
	active bool NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);