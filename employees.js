module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added


    function getLibrarians(res, mysql, context, complete){
        mysql.pool.query("SELECT `employeeID`, `firstName`, `lastName`, Genres.name as `focus` FROM `Librarians` LEFT JOIN `Genres` ON `focus` = Genres.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees  = results;
            complete();
        });
    }
    // router.get('/', function(req, res) {
    //     res.render('employees')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getLibrarians(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('employees', context);
            }

        }
    });
    return router;
}();