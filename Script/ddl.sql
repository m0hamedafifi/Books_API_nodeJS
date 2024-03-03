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



alter table BMS.book
add column price numeric(5,3) 
not null;


-- bms.audit table
create table bms.Audit(
id serial not null,
audit_action varchar(200),
audit_data json ,
status numeric(3),
audit_ERROR json,
audit_by varchar(20),
audit_on timestamp
);


-- bms.APP_USERS table
create table bms.APP_USERS(
 user_ID serial not null ,
 Username varchar(50) not null,
 full_name varchar(200) not null,
 "password" varchar(200) not null,
 email varchar (356) not null ,
 User_type_code varchar(10) not null,
 user_disabled boolean  default false not null ,
 verified_user boolean  default false not null,
 created_by varchar(50) not null ,
 created_on timestamp not null,
 updated_by varchar(50) ,
 updated_on timestamp ,
 constraint user_pkey primary key (user_ID),
 constraint user_userName_key unique (Username),
 constraint user_email_key unique (email)
);


alter table bms.app_users 
add column IS_Admin boolean default false not null;