CREATE DATABASE USERS;
\c USERS;

CREATE TABLE ANIMAL (
  code_animal VARCHAR(42),
  type VARCHAR(42),
  photo VARCHAR(42),
  name VARCHAR(42),
  weight VARCHAR(42),
  age VARCHAR(42),
  sex VARCHAR(42),
  breed VARCHAR(42),
  about VARCHAR(42),
  energy_level VARCHAR(42),
  feeding_schedule VARCHAR(42),
  potty_break_schedule VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_animal),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE APPARTIENT (
  code_permission VARCHAR(42),
  code_role VARCHAR(42),
  PRIMARY KEY (code_permission, code_role),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE BOOKING (
  code_booking VARCHAR(42),
  start_date VARCHAR(42),
  end_date VARCHAR(42),
  status VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_booking),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE DETIENT (
  code_user VARCHAR(42),
  code_role VARCHAR(42),
  PRIMARY KEY (code_user, code_role),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE DISPONIBILITY (
  code_disponibility VARCHAR(42),
  start_date VARCHAR(42),
  end_date VARCHAR(42),
  PRIMARY KEY (code_disponibility),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE ETABLIR (
  code_disponibility VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_disponibility, code_user),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE IMAGE (
  code_image VARCHAR(42),
  label VARCHAR(42),
  path_access VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_image),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE MESSAGE (
  code_message VARCHAR(42),
  topic VARCHAR(42),
  body VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_message),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE PERMISSION (
  code_permission VARCHAR(42),
  label VARCHAR(42),
  PRIMARY KEY (code_permission),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE ROLE (
  code_role VARCHAR(42),
  label VARCHAR(42),
  PRIMARY KEY (code_role),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE TESTIMONIAL (
  code_testimonial VARCHAR(42),
  body VARCHAR(42),
  rating VARCHAR(42),
  code_user VARCHAR(42),
  PRIMARY KEY (code_testimonial),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

CREATE TABLE USER (
  code_user VARCHAR(42),
  firstname VARCHAR(42),
  lastname VARCHAR(42),
  email VARCHAR(42),
  avatar VARCHAR(42),
  street_number VARCHAR(42),
  street_name VARCHAR(42),
  zip_code VARCHAR(42),
  town VARCHAR(42),
  country VARCHAR(42),
  PRIMARY KEY (code_user),
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

ALTER TABLE ANIMAL ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE APPARTIENT ADD FOREIGN KEY (code_role) REFERENCES ROLE (code_role);
ALTER TABLE APPARTIENT ADD FOREIGN KEY (code_permission) REFERENCES PERMISSION (code_permission);
ALTER TABLE BOOKING ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE DETIENT ADD FOREIGN KEY (code_role) REFERENCES ROLE (code_role);
ALTER TABLE DETIENT ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE ETABLIR ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE ETABLIR ADD FOREIGN KEY (code_disponibility) REFERENCES DISPONIBILITY (code_disponibility);
ALTER TABLE IMAGE ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE MESSAGE ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
ALTER TABLE TESTIMONIAL ADD FOREIGN KEY (code_user) REFERENCES USER (code_user);
