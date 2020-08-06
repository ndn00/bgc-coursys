CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;



CREATE TABLE course_sessions (
	course_id 	 	 INTEGER NOT NULL,
	session_start	 TIMESTAMP,
	session_end	 	 TIMESTAMP,
	session_name	 varchar,
	FOREIGN KEY (course_id) REFERENCES courses
		ON DELETE CASCADE
);

CREATE TABLE users (
	id		 BIGSERIAL PRIMARY KEY,
	email		 VARCHAR(255) UNIQUE,
	password	 VARCHAR(100),
	type		 VARCHAR(50),
	approved	 BOOLEAN
);


CREATE TABLE courses (
	id		 BIGSERIAL PRIMARY KEY,
	course_name	 VARCHAR(30),
	topic		 VARCHAR(30),
	location	 VARCHAR(30),
	seat_capacity	 INTEGER NOT NULL,
	description	 VARCHAR,
	course_deadline	 TIMESTAMP,
	sessions	 SMALLINT
);

CREATE TABLE enrollment (
	course_id	 INTEGER NOT NULL,
	user_id		 INTEGER NOT NULL,
	time		 TIMESTAMP,
	FOREIGN KEY (course_id) REFERENCES courses
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users
		ON DELETE CASCADE
);

CREATE TABLE tags (
	course_id	 INTEGER NOT NULL,
	tag			 VARCHAR(30),
	FOREIGN KEY (course_id) REFERENCES courses
		ON DELETE CASCADE		
);