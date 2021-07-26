CREATE TABLE Genres (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Librarians (
    employeeID INT(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    focus INT(11),
    PRIMARY KEY (employeeID),
    FOREIGN KEY (focus) REFERENCES Genres (id) ON DELETE SET NULL
);

CREATE TABLE Rooms (
    roomNumber INT(11) UNIQUE NOT NULL,
    capacity INT(11),
    PRIMARY KEY (roomNumber)
);

INSERT INTO Genres (name) VALUES ("Fiction");
INSERT INTO Genres (name) VALUES ("Horror");
INSERT INTO Genres (name) VALUES ("American History");

INSERT INTO Librarians (first_name, last_name, focus) VALUES ("Benjamin", "Murphy", 2);
INSERT INTO Librarians (first_name, focus) VALUES ("Jack", 1);
INSERT INTO Librarians (first_name, last_name) VALUES ("Jessica", "Barn");

INSERT INTO Rooms (roomNumber, capacity) VALUES (102, 50);
INSERT INTO Rooms (roomNumber, capacity) VALUES (100, 10);
INSERT INTO Rooms (roomNumber, capacity) VALUES (101, 2);