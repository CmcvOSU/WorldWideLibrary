module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added

    function getRooms(res, mysql, context, complete){
        mysql.pool.query("SELECT `roomNumber`, `capacity` FROM `Rooms`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms  = results;
            complete();
        });
    }


    // router.get('/', function(req, res) {
    //     res.render('rooms')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getRooms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('rooms', context);
            }

        }
    });
    return router;
}();