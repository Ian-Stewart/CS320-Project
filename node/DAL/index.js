var mysql = require('mysql');

var connInfo = 
{
    host: 'instance33534.db.xeround.com',
    port: 14675,
    user: 'user',
    password: 'cs320',
    database: 'mtt_test'
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
exports.isUserValid = function(user, pass, callback)
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
exports.retrieveAllUsers = function(callback)
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
exports.createNewUser = function(user, callback)
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
exports.editUser = function(user, callback)
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
exports.deleteUser = function(user, callback)
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

//gets all of the applications whose PI is the specified user. Takes usersEntry object, Value is array of applicationsEntry objects.
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

exports.getForm = function(aid, callback)
{
    conn.query("SELECT * FROM Forms WHERE aid=?", aid, function(err, result)
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

exports.saveForm = function(form, callback)
{
    conn.query("UPDATE Forms SET ? WHERE aid=?", [form, form.aid], function(err, result)
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



