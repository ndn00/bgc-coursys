CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE "users" (
    "id" bigserial PRIMARY KEY,
    "email" varchar(255) UNIQUE,
    "password" varchar(100),
    "type" varchar(50)
);

CREATE TABLE courses (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(30),
    topic           VARCHAR(30),
    location        VARCHAR(30),
    start_date      TIMESTAMP,
    end_date        TIMESTAMP,
    seat_capacity   INT,
    seat_count      INT,
    description     VARCHAR
);

CREATE TABLE enrollment (
    course_id       INT NOT NULL,
    user_id         INT NOT NULL,
    position        INT,
    PRIMARY KEY(course_id, user_id),
    FOREIGN KEY (course_id) REFERENCES courses
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users
        ON DELETE CASCADE
);

