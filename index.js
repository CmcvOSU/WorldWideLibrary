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
    return router;
}();