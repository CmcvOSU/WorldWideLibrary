-- For all queries, @ character denote the variables that will have data from the backend programming language

--## Rooms Queries ##
-- gets roomNumber and capacity columns from Rooms entity
SELECT `roomNumber`, `capacity` FROM `Rooms`

-- adds new row to Rooms
INSERT INTO `Rooms` VALUES (@room_num, @capacity)

-- deletes row from Rooms 
DELETE FROM `Rooms` WHERE `roomNumber` = @room_num

-- edits row in Rooms
UPDATE `Rooms` SET  `capacity` = @capacity WHERE `roomNumber` = @room_num


-- ## Genres Queries ##
-- gets id column from Genres entity
SELECT `name` from `Genres`

-- adds new row to Genres
INSERT INTO `Genres` (`name`) VALUES (@genre_name)

-- delete row from Genres
DELETE FROM `Genres` WHERE `id` = @genre_id

-- edits row in Genres
UPDATE `Genres` SET `name` = @genre_name WHERE `id` = @genre_id


--## Librarians Queries ##
--gets employeeID, firstName, lastName, and focus from Librarians entity
SELECT `employeeID`, `firstName`, `lastName`, Genres.name as `focus` FROM `Librarians` LEFT JOIN `Genres` ON `focus` = Genres.id;

--adds row to Librarians 
INSERT INTO `Librarians` (`firstName`, `lastName`, `focus`) VALUES (@lib_fName, @lib_lName, @focus)

--deletes row from Librarians
DELETE FROM `Librarians` WHERE `employeeID` = @employee_id

--edits 
UPDATE `Librarioans` SET `firstName` = @lib_fName, `lastName` = @lib_lName, `focus` = @focus WHERE `employeeID` = @employee_id



