DROP TABLE IF EXISTS `Genres`;
CREATE TABLE `Genres` (
    `id` INT(11) AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `Librarians`;
CREATE TABLE `Librarians` (
    `employeeID` INT(11) AUTO_INCREMENT NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `focus` INT(11),
    PRIMARY KEY (`employeeID`),
    FOREIGN KEY (focus) REFERENCES Genres (`id`) ON DELETE SET NULL
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE `Rooms` (
    `roomNumber` INT(11) NOT NULL,
    `capacity` INT(11),
    PRIMARY KEY (`roomNumber`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `Patrons`;
CREATE TABLE `Patrons` (
	`libraryID` INT(11) PRIMARY KEY AUTO_INCREMENT,
	`firstName` VARCHAR(255),
	`lastName` VARCHAR(255),
	`reservation` INT(11),
	FOREIGN KEY (`reservation`) REFERENCES Rooms(`roomNumber`) ON DELETE SET NULL
	) ENGINE = InnoDB;

DROP TABLE IF EXISTS `Patron_book`;
CREATE TABLE `Patron_book` (
	`pid` INT(11),
	`bid` VARCHAR(255),
	`checkoutDate` DATE,
	`returnDate` DATE,
	FOREIGN KEY (`pid`) REFERENCES Patrons(libraryID) ON DELETE CASCADE,
	FOREIGN KEY (`bid`) REFERENCES Books(isbn) ON DELETE CASCADE
	) ENGINE = InnoDB;
    
DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
	`isbn` VARCHAR(255) PRIMARY KEY,
	`title` VARCHAR(255),
	`author` VARCHAR(255),
	`genre` INT(11),
	FOREIGN KEY (`genre`) REFERENCES Genres(id) ON DELETE SET NULL
	) ENGINE = InnoDB;

INSERT INTO `Patrons` VALUES (1, 'Daniel', 'Park', NULL), (2, 'Muhammad', 'Lee', NULL), 
(3, 'Michael', 'Calmis', NULL), (4, 'Mason', 'Sperling', NULL), (5, 'Emily', 'Koch', NULL), 
(6, 'Cordelia', 'Watson', NULL), (7, 'Danny', 'Padilla', NULL);

INSERT INTO `Books` VALUES ('9780446310789', 'To Kill a Mockingbird', 'Harper Lee', 1), 
('19849780140862539', '1984', 'George Orwell', 1), 
('9781405879910', 'The Great Gatsby', 'F. Scott Fitzgerald', 3), 
('9783839893876', 'Pride and Prejudice', 'Jane Austen', 2), 
('9780399529207', 'Lord of the Flies', 'William Golding', 3);    

INSERT INTO Genres (name) VALUES ("Fiction"), ("Horror"), ("American History");

INSERT INTO Librarians (first_name, last_name, focus) VALUES ("Benjamin", "Murphy", 2);
INSERT INTO Librarians (first_name, focus) VALUES ("Jack", 1);
INSERT INTO Librarians (first_name, last_name) VALUES ("Jessica", "Barn");

INSERT INTO Rooms VALUES (100, 50), (101, 10);
INSERT INTO Rooms (roomNumber) VALUES (101);
