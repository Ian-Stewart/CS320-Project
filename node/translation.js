/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , http = require('http')
 , path = require('path')
 , model = require('./DAL/index.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index); //I don't know what this does, but I did not put it here


//gets all of the applications for a PI. Username is needed.
app.get('/getPIApplications/:username', function(req, res) {
    model.retrieveApplicationsForPI(req.params.username, function(result) { res.send(result); } );
    });
 
//gets all of the applications for a CCI. Username is needed.
app.get('/getCCIApplications/:username', function(req, res) {
    model.retrieveApplicationsForCCI(req.params.username, function(result) { res.send(result); } );
    });
    
//gets all of the applications for a IRB. Username is needed.
app.get('/getIRBApplications/:username', function(req, res) {
    model.retrieveApplicationsForIRB(req.params.username, function(result) { res.send(result); } );
    });    
    
//gets a specific form a - we are NOT checking username, it can be any string. AID for the formA's application is needed.
app.get('/getFormA/:username/:aid', function(req, res) {
    model.retrieveFormA(req.params.username, req.params.aid, function(result) { res.send(result); } );
    });
    
//edits an application. NOT checking username. Application is where you shove your entire JSON object.
app.get('/editApplication/:username/:application', function(req, res){
    model.editApplication(req.params.username, req.params.application, function(result) { res.send(result); } );
    });
    
//saves an edit to a form. We ARE checking username on this one. form is where you shove your entire JSON object.
app.get('/saveForm/:username/:form', function(req, res){
    model.saveForm(req.params.username, req.params.form, function(result) { res.send(result); } );
    });
    
//gets one application based on its aid. This one does not check username, aid is the applicaton id for the application you want.
app.get('/retrieveApplication/:username/:aid', function(req, res){
    model.retrieveApplication(req.params.username, req.params.aid, function(result) { res.send(result); } );
    });
    
//create an application - this creates a blank application. The application will have whatever long title you pass in title. Not checking username.
//return value is "special" for this one- value is an object which only has one parameter - aid, which you can use when you call retrieveApplication.
//this creates a blank form A for you too, automagically, same aid.
app.get('/createApplication/:username/:title', function(req, res){
    model.saveForm(req.params.username, req.params.title, function(result) { res.send(result); } );
    });
    
    

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
