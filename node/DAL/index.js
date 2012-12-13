var mysql = require('mysql');

var connInfo = 
{
    //vicky
    host: 'instance33534.db.xeround.com',
    port: 14675,
    
    //warren
    //host: 'instance34196.db.xeround.com',
    //port: 16062,

    user: 'user',
    password: 'cs320',
    database: 'mtt'
};
    
var conn;

exports.connectToDatabase = function() 
{
    conn = mysql.createConnection(connInfo);
    conn.connect(function (err) 
    {
        if(err) 
        {
            console.log("There was an error connecting to the database");
        }
        else 
        {
            console.log("Data Access Layer Connected to Database");
        }
    });
}

//
// USER RELATED FUNCTIONS
//

//Checks if the specified user is valid. Takes username and password. Value is boolean.
exports.isUserValid = function(username, pass, callback)
{ 
    conn.query("SELECT password FROM Logins WHERE u_name = ?", user, function(err, result) 
    {
        if (err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error" });
        }
        else
        {
            if(result.length >= 1 && result[0].password === pass)
            {
                callback({status: true, value: true, ErrMsg:undefined});
            }
            else
            {
                callback({status: true, value: false, ErrMsg:undefined});
            }
        }
    } );
}

//retrieve all users returns a list of all users. Takes nothing, Value is array of usersEntry objects.
exports.retrieveAllUsers = function(username,callback)
{
    conn.query("SELECT * FROM Users", function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: result, ErrMsg: undefined});
        }
    });
}

//adds a user to the database. Takes usersEntry object, Value is undefined.
exports.createNewUser = function(username, callback)
{
    conn.query("INSERT INTO Users SET ?", user, function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: undefined, ErrMsg: undefined});
        }
    });
}

//replaces the current user information with whatever is in the given object. Takes usersEntry object, Value is undefined. NOTE: This method does absolutely no validation!
exports.editUser = function(username, callback)
{
    conn.query("UPDATE Users SET ? WHERE uid=?", [user, user.uid], function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: undefined, ErrMsg: undefined});
        }
    });
}

//deletes the specified user from the database. Takes usersEntry object, Value is undefined. NOTE: This method does almost no validation aside from a basic sanity check on UID.
exports.deleteUser = function(username, callback)
{
    if(!user.uid || user.uid < 0 || user.uid === "") //basic sanity checking on UID
    {
        callback({status: false, value: undefined, ErrMsg: "User Id is not a valid number!"});
    }
    else
    {
        conn.query("DELETE FROM Users WHERE uid=?", user.uid, function(err, result)
        {
            if(err)
            {
                callback({status: false, value: undefined, ErrMsg: "Database Error"});
            }
            else
            {
                callback({status: true, value: undefined, ErrMsg: undefined});
            }
        });
    }
}
    
//
// APPLICATION RELATED FUNCTIONS
//

<<<<<<< HEAD
=======
//gets all of the applications whose PI is the specified user. 
//Takes usersEntry object 
//Value is array of applicationsEntry objects.
exports.retrieveAllApplicationsForPI = function(user, callback)
{
    conn.query("SELECT * FROM Applications WHERE uid=?", user.uid, function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: result, ErrMsg: undefined});
        }
    });
}

//save a changed version of an application. Takes an application object. Value is undefined.
>>>>>>> 96b6f8d316e4cc3192858a5939548f6f7742e212
exports.editApplication = function(application, callback)
{
    conn.query("UPDATE Applications SET ? WHERE aid=?", [application, application.aid], function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: undefined, ErrMsg: undefined});
        }
    });
}

//save a changed version of a form. Takes a form object. Value is undefined.
exports.saveForm = function(form, callback)
{
    conn.query("UPDATE FormA SET ? WHERE aid=?", [form, form.aid], function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            callback({status: true, value: undefined, ErrMsg: undefined});
        }
    });
}


//Gets an application given an application Id
exports.retrieveApplication = function(aid,callback)
{
    conn.query("SELECT * FROM Applications WHERE aid=?",aid,function(err,result)
    {
        if(err)
        {
            callback({status:false,value: undefined,ErrMsg:"Database Error"});
        }
        else
        {
            callback({status:true, value:result,ErrMsg:undefined});
        }

    });
}

//Gets an application's form A
//Takes an application Id
exports.retrieveFormA = function(aid,callback)
{
    conn.query("SELECT * FROM FormA WHERE aid=?",aid,function(err,result)
    {
        if(err)
        {
            callback({status:false,value: undefined,ErrMsg:"Database Error"});
        }
        else
        {
            callback({status:true,value:result,ErrMsg:undefined});
        }
    });
}


//Note: may want to revisit these to verify that the user given is actually a CCI/IRB etc
//Retrieves all applications for a given PI
exports.retrieveApplicationsForPI = function(username,callback)
{
    conn.query("SELECT aid, proposalTitle FROM Applications WHERE submissionState IS null AND username = ?",username,function(err,result)
    {
        if(err)
        {
            callback({status:false,value:undefined,ErrMsg:"Database Error"});
        }
        else
        {
            callback({status:true,value:result,ErrMsg:undefined});
        }
    });
}

//Retrieves all applications for a given CCI
exports.retrieveApplicationsForCCI = function(username,callback)//Username is currently not used
{
    conn.query("SELECT aid,proposalTitle, username FROM Applications WHERE submissionState = CCI",function(err,result)
        {
            if(err)
            {
                callback({status:false,value:undefined,ErrMsg:"Database Error"});
            }
            else
            {
                callback({status:true,value:result,ErrMsg:undefined});
            }
        });
}

//Retrieves all applications for a given IRB
exports.retreiveApplicationsForIRB = function (username,callback)//Username is currently not used
{
    conn.query("SELECT aid,proposalTitle, username FROM Applications WHERE submissionState = IRB",function(err,result)
        {
            if(err)
            {
                callback({status:false,value:undefined,ErrMsg:"Database Error"});
            }
            else
            {
                callback({status:true,value:result,ErrMsg:undefined});
            }
        });
}

//Retrieves all archived applications created by a given user
exports.retrieveArchivedApplicationsForUser = function(username,callback)
{
    conn.query("SELECT aid,proposalTitle, username FROM Applications WHERE editState = archived AND username = ?",username,function(err,result)
        {
            if(err)
            {
                callback({status:false,value:undefined,ErrMsg:"Database Error"});
            }
            else
            {
                callback({status:true,value:result,ErrMsg:undefined});
            }
        });
}
