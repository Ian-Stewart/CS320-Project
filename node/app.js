var express = require('express');
var routes  = require('./routes');

var app = module.exports = express();

// Configuration

//register ejs as .html
app.engine('.html', require('ejs').__express);

//ejs directory
app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(app.router);
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.set('db uri', 'localhost/dev');
})

app.configure('production', function(){
    app.set('db uri', 'n.n.n.n/prod');
})

// Routes
app.get('/redirect', function (req, res) {
    res.redirect('/sRedirect.html');
});


app.listen(3000);
console.log("Express server listening on port 3000");


//console.log("Express server listening on port %d in %s mode",
//    app.address().port, app.settings.env);