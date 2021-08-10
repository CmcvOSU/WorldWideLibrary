module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added
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

    function getBook(res, mysql, context, id, complete){
        var sqlQuery = "SELECT `isbn`, `title`, `author`, `genre` from Books WHERE isbn = ?";
        var inserts = [id];
        mysql.pool.query(sqlQuery, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book  = results[0];
            complete();
        });
    }

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteBook.js"];
        var mysql = req.app.get('mysql');
        getBooks(req, res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('books', context);
            }

        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectGenre.js", "updateBook.js"];
        var mysql = req.app.get('mysql');
        getBook(res, mysql, context, req.params.id, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update_book', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Books` VALUES (?, ?, ?, ?)";
        if (req.body.isbn == ""){
            return;
        }
        var inserts = [req.body.isbn, req.body.title, req.body.author, req.body.genre];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/books');
            }
        });
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Books SET title=?, author=?, genre=? WHERE isbn=?";
        var inserts = [req.body.title, req.body.author, req.body.genre, req.params.id];
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

    router.delete('/:id', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Books WHERE isbn = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });

    return router;
}();