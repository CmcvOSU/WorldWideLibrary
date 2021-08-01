
// Setup
var db = require('./database/db-connector.js')

var express = require('express');
var app = express();
app.set('port', 2098);

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname:".hbs"
}));
app.set('view engine', '.hbs');


// Routes

app.get('/', function(req, res)
{
  res.render('index')
});

app.get('/:id', function(req, res){
	res.render(req.params.id);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//Listener

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
