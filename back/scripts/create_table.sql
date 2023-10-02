-- Fichier de création des tables de la DB
BEGIN;
-- Suppression des tables

DROP TABLE IF EXISTS "animal", "role_has_permission", "booking", "user_has_role", "disponibility", "user_has_disponibility", "image", "message", "message_admin", "permission", "role", "testimonial", "user";


-- Création des tables

CREATE TABLE "user" (
  id INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  firstname VARCHAR(42) NOT NULL,
  lastname VARCHAR(42) NOT NULL,
  email VARCHAR(42) NOT NULL UNIQUE,
  user_password VARCHAR(72) NOT NULL,
  date_birth DATE,
  avatar VARCHAR(42),
  user_address VARCHAR(42),
  lattitude FLOAT,
  longitude FLOAT,
  street_number VARCHAR(42),
  street_name VARCHAR(42),
  zip_code VARCHAR(42),
  town VARCHAR(42),
  country VARCHAR(42),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE animal (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type VARCHAR(42),
  photo VARCHAR(42),
  name VARCHAR(42),
  weight_category VARCHAR(42),
  age VARCHAR(42),
  sex VARCHAR(42),
  breed VARCHAR(42),
  about TEXT,
  energy_level VARCHAR(42),
  feeding_schedule VARCHAR(42),
  potty_break_schedule VARCHAR(42),
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE booking (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  start_date VARCHAR(42),
  end_date VARCHAR(42),
  message TEXT,
  booking_status VARCHAR(42),
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  sender_id INTEGER NOT NULL REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE disponibility (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  start_date VARCHAR(42),
  end_date VARCHAR(42),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE image (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(42),
  path_access VARCHAR(42),
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE message (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  topic VARCHAR(42),
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  sender_id INTEGER NOT NULL REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE message_admin (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subject_message VARCHAR(42),
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE role (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(42),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE permission (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(42),
  role_id INTEGER NOT NULL REFERENCES "role"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE testimonial (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  body TEXT,
  rating VARCHAR(42),
  user_id INTEGER REFERENCES "user"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE user_has_disponibility (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES "role"("id"),
  disponibility_id INTEGER NOT NULL REFERENCES "disponibility"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE role_has_permission (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES "role"("id"),
  permission_id INTEGER NOT NULL REFERENCES "permission"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE user_has_role (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"("id"),
  role_id INTEGER NOT NULL REFERENCES "role"("id"),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

COMMIT;