DROP TABLE notes;
DROP TABLE todolist;

CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, content)
VALUES 
    ('First note', 'This project suckssss'),
    ('Second note', 'This project still sucks ughhh');

CREATE TABLE todolist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    done BOOLEAN NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO todolist (description, done)
VALUES 
    ('Number 1', false),
    ('Number 2', false);