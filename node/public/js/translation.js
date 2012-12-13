/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , user = require('./routes/user')
 , http = require('http')
 , path = require('path')
 , model = require('./node_modules/test/mockRequestHandler.js');

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

app.get('/', routes.index);
app.get('/users', user.list);

/*
Description:  Public Function called by the content module, returns the revision history for a particular form based on its FormID.
calls getRevisions(form)
*/

app.get('/getFormHistory', function(req, res) {
  var formHistory = model.getRevisions(req.query.token, req.query.formID)

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(formHistory) );
  res.end('\n');
});


/*
Description:  Public Function called by the content module, returns the comments for a particular form based on its FormID.
calls getForm(form)
*/

app.get('/getFormComments', function(req, res){
  var formComments = model.getForm(req.query.token, req.query.formID);

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(formComments) );
  res.end('\n');
});


/*
Description:  Public Function called by the content module, returns the full set of forms for a particular Application based on its ApplicationID.
calls retrieveAllFormsForApplication()
*/

app.get('/getApplicationForms', function(req, res){
  var forms = model.getForm(req.query.token, req.query.applicationID);

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(forms) );
  res.end('\n');
});

/*
Description:  Public Function called by the content module, sends pertinent information to function handler for creating a new application.
calls createNewApplication() and
*/

app.get('/createApplication', function(req, res){
  var result = model.createNewApplication(req.query.token);

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(result) );
  res.end('\n');
});


/*
Description:  Public Function called by the content module, passes updated form with associated ID and data to the function handler which updates the corresponding form associated with the given applicationID.
calls saveForm(form,formObjectJSON)
*/

app.get('/saveForm', function(req, res){
  var result = model.saveForm(req.query.token, req.query.form);

  console.log(result);

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(result) );
  res.end('\n');
});

/*
Description:  Public function called by the content module, passes username, applicationID and formID  to request handler which associates the username as a CI on the given application  with read/write privileges to the forms in formID
calls delegateApplication(user_a, user_b, applicationID)
*/

app.get('/delegateApplication', function(req, res){
  var result = model.delegateApplication(req.query.token, req.query.username, req.query.applicationID, req.query.formID);

  res.writeHead(200, {'content-type': 'text/json' });
  if (result.code == 1){
    res.write( JSON.stringify(result) );
  }
  else{
    // res.write( JSON.stringify(sendNotification(req.query.username, 'request_ci') ) );
  }
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID and list of CIs to be added to the request handler which associates the users in the list as CIs on the given application.
calls editUser(username, userObjectJSON) and createNewUser(username, userObjectJSON)
*/

app.get('/AddCIs', function(req, res){
  var result = model.addCIs(req.query.Token, req.query.ApplicationID, req.query.CIList);

  res.writeHead(200, {'content-type': 'text/json' });
  if (result.status == 1){
    res.write( JSON.stringify(result) );
  }
  else{
    // res.write( JSON.stringify(sendNotification(req.query.CIList, 'Added as CI') ) );
  }
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID and list of forms to be removed to the request handler which removes the forms in the list from the given application.
calls removeForms()
*/

app.get('/RemoveForms', function(req, res){
  var result = model.removeForms(req.query.token, req.query.applicationID, req.query.formIDs);

  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify(result) );
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID to the request handler which updates the status of the application to accepted.
calls changeApplicationStatus(applicationID, status)
*/

app.get('/AcceptApplication', function(req, res){
  var result = model.changeApplicationStatus(req.query.token, req.query.applicationID, "Accepted");

  res.writeHead(200, {'content-type': 'text/json' });

  //if (result.status = 1){
    res.write( JSON.stringify(result) );
  /*}
  else{
    var PI = getPIOfApp(req.query.token, req.query.applicationID);
    if (PI.status == 1){
      res.write( JSON.stringify(PI) );
    }
    else{
      res.write( JSON.stringify(sendNotification(PI.value, "Application Accepted") ) );
    }
  }
  */
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID to the request handler which updates the status of the application to rejected.
calls changeApplicationStatus(applicationID, status)
*/

app.get('/RejectApplication', function(req, res){
  var result = model.changeApplicationStatus(req.query.token, req.query.applicationID, "Rejected");

  res.writeHead(200, {'content-type': 'text/json' });
  //if (result.code == 1){
    res.write( JSON.stringify(result) );

  /*}
  else{
    var PI = model.getPIOfApp(req.query.token, req.query.applicationID);
    if (PI.code == 1){
      res.write( JSON.stringify(PI) );
    }
    else{
      // res.write( JSON.stringify(model.sendNotification(PI.value, "Application Rejected")) );
    }
  }
  */
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID and reviewers to the request handler which associates the users in the list as CCI/IRB reviewers for the application.
calls editUser(username, useObjectJSON)
*/

app.get('/DelegateReview', function(req, res){
  var result = model.addAsReviewer(req.query.token, req.query.applicationID, req.query.reviewers);

  res.writeHead(200, {'content-type': 'text/json' });
  if (result.code == 1){
    res.write( JSON.stringify(result) );
  }
  else{
    // res.write( JSON.stringify(sendNotification(reviewers, "Delegated for Review") ) ); 
  }
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes user data to the request handler which adds a user account from the given data.
calls createNewUser(username, userObjectJSON)
*/
app.get('/CreateAccount', function(req, res){
  var result = model.createNewUser(req.query.userData.username, req.query.userData);

  res.writeHead(200, {'content-type': 'text/json' });
  if (result.code == 1){
    res.write( JSON.stringify(result) );
  }
  else{
    // res.write( JSON.stringify(sendNotification(req.query.userData.username, "New Account") ) );            
  }
  res.end('\n');
});




/*
Description:  Public function called by the content module, passes a formID to the request handler which updates the status of the form.
calls submitForm(formID, username)
*/

app.get('/SubmitApplication', function(req, res){
  var result = model.submitApplication(req.query.token, req.query.applicationID)

  res.writeHead(200, {'content-type': 'text/json' });
  //if (result.code == 1){
    res.write( JSON.stringify(result) );
  /*}
  else{
    var Chair = model.getChair(req.query.token);
    if (Chair.code == 1){
      res.write ( JSON.stringify(Chair) );
    }
    else{
      // res.write( JSON.stringify (sendNotification(Chair.value, "Application submitted for review") ) );
    }
  }
  */
  res.end('\n');
});


/*
Description:  Public function called by the content module, passes applicationID and list of users to the request handler which associates the users with the given application as requested CIs. It also sends a request to the notification module to send notifications to the potential CIs.
calls editUser(user, userObjectJSON)*/

app.get('/RequestCollaboration', function(req, res){
  result = model.addPotentialCI(req.query.token, req.query.applicationID, req.query.ciList);

  res.writeHead(200, {'content-type': 'text/json' });
  if (result.code == 1){
    res.write( JSON.stringify(result) );
  }
  else{
    res.write( JSON.stringify(sendNotification(req.query.ciList, "Collaboration Requested") ) );
  }
  res.end('\n');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
