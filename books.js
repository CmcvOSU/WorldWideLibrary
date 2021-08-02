module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added
    function getBooks(res, mysql, context, complete){
        mysql.pool.query("SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.books  = results;
            complete();
        });
    }


    // router.get('/', function(req, res) {
    //     res.render('books')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getBooks(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('books', context);
            }

        }
    });
    return router;
}();