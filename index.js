module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBooks(req, res, mysql, context, complete){
        if (req.query.genre === undefined) {
            sqlQuery = "SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id"
        }
        else if (req.query.genre === ""){
            sqlQuery = "SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id"
        }
        else {
            sqlQuery = "SELECT isbn, title, author, Genres.name as genre FROM Books LEFT JOIN Genres ON genre = Genres.id WHERE genre ="+ req.query.genre
        }
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.books  = results;
            complete();
        });
    }

    function getBook(res, mysql, context, id, complete) {
        var sqlQuery = "SELECT `isbn`, `title` from Books WHERE isbn = ?";
        var inserts = [id];
        mysql.pool.query(sqlQuery, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.send();
            }
            context.book = results[0];
            complete();
        });
    }

    function getPatrons(res, mysql, context, complete){
        var sqlQuery = "SELECT `libraryID`, `firstName`, `lastName` FROM `Patrons`"
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons  = results;
            complete();
        });
    }

    function getRooms(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Rooms", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms = results;
            complete();
        });
    }

    function getGenres(res, mysql, context, complete){
        mysql.pool.query("SELECT `id`, `name` from `Genres`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genres  = results;
            complete();
        });
    }

    function getPatronIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT `libraryID` from `Patrons`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons  = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getRooms(res, mysql, context, complete);
        getBooks(req, res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('index', context);
            }

        }
    });

    router.get('/patron_reservation/:id', function(req, res){
        callbackCount = 0;
        var context = {id:req.params.id};
        context.jsscripts = ["updatePatron.js"];
        var mysql = req.app.get('mysql');
        getPatronIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('patron_reservation', context);
            }

        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Patrons SET reservation=? WHERE libraryID=?";
        var inserts = [req.body.reservation, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.get('/borrow/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["borrowBook.js", "selectPatrons.js"];
        var mysql = req.app.get('mysql');
        getBook(res, mysql, context, req.params.id, complete);
        getPatrons(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('borrow_book', context);
            }
        }

    });
    return router;
}();