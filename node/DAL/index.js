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


exports.editApplication = function(username,application, callback)
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

exports.saveForm = function(username,form, callback)
{
    var allowEdit = function() //this gets run when if and only if the user is actually allowed to do the edit
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
    };
    conn.query("SELECT * FROM Logins INNER JOIN On_Permissions ON Logins.uid=On_Permissions.uid WHERE Logins.username=?", function(err, result)
    {
        if(err)
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else
        {
            if(result[0])
            {
                if(result[0].permid === 12341) //cci
                {
                    conn.query("SELECT * FROM Applications WHERE aid=?", form.aid, function(err, result)
                    {
                        if(err)
                        {
                            callback({status: false, value: undefined, ErrMsg: "Database Error"});
                        }
                        else
                        {
                            if(result[0])
                            {
                                if(result[0].submissionState === 'CCI')
                                {
                                    allowEdit();
                                }
                                else
                                {
                                    callback({status: false, value: undefined, ErrMsg: "Insufficient Permissions"});
                                }
                            }
                            else
                            {
                                callback({status: false, value: undefined, ErrMsg: "Database Error"});
                            }
                        }
                    });    
                }
                else if(result[0].permid === 23523) //admin
                {
                    callback({status: false, value: undefined, ErrMsg: "Insufficient Permissions"});
                }
                else if(result[0].permid === 123912) //pi
                {
                    conn.query("SELECT * FROM Applications WHERE aid=?", form.aid, function(err, result)
                    {
                        if(err)
                        {
                            callback({status: false, value: undefined, ErrMsg: "Database Error"});
                        }
                        else
                        {
                            if(result[0])
                            {
                                if(result[0].editState === 'open' && result[0].submissionState !== 'IRB' && result[0].submissionState !== 'CCI' && result[0].approvalState !== 'null')
                                {
                                    allowEdit();
                                }
                                else
                                {
                                    callback({status: false, value: undefined, ErrMsg: "Insufficient Permissions"});
                                }
                            }
                            else
                            {
                                callback({status: false, value: undefined, ErrMsg: "Database Error"});
                            }
                        }
                    });
                }
                else if(result[0].permid === 324552) //irb
                {
                    conn.query("SELECT * FROM Applications WHERE aid=?", form.aid, function(err, result)
                    {
                        if(err)
                        {
                            callback({status: false, value: undefined, ErrMsg: "Database Error"});
                        }
                        else
                        {
                            if(result[0]) 
                            {
                                if(result[0].submissionState === 'IRB')
                                {
                                    allowEdit();
                                }
                                else
                                {
                                    callback({status: false, value: undefined, ErrMsg: "Insufficient Permissions"});
                                }
                            }
                            else
                            {
                                callback({status: false, value: undefined, ErrMsg: "Database Error"});
                            }
                        }
                    });
                }
                else
                {
                    callback({status: false, value: undefined, ErrMsg: "Database Error"});
                }
            }
            else
            {
                callback({status: false, value: undefined, ErrMsg: "Database Error"});
            }
        }
    });
}


//Gets an application given an application Id
exports.retrieveApplication = function(username,aid,callback)
{
    conn.query("SELECT * FROM Applications WHERE aid=?",aid,function(err,result)
    {
        if(err)
        {
            callback({status:false,value: undefined,ErrMsg:"Database Error"});
        }
        else
        {
            callback({status:true, value:result[0],ErrMsg:undefined});
        }

    });
}

//Gets an application's form A
//Takes an application Id
exports.retrieveFormA = function(username,aid,callback)
{
    conn.query("SELECT * FROM FormA WHERE aid=?",aid,function(err,result)
    {
        if(err)
        {
            callback({status:false,value: undefined,ErrMsg:"Database Error"});
        }
        else
        {
            callback({status:true,value:result[0],ErrMsg:undefined});
        }
    });
}


//Note: may want to revisit these to verify that the user given is actually a CCI/IRB etc
//Retrieves all applications for a given PI
exports.retrieveApplicationsForPI = function(username,callback)
{
    conn.query("SELECT * FROM Applications WHERE submissionState IS null AND username = ?",username,function(err,result)
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
    conn.query("SELECT * FROM Applications WHERE submissionState = 'CCI'",function(err,result)
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
    conn.query("SELECT * FROM Applications WHERE submissionState = 'IRB'",function(err,result)
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
    conn.query("SELECT * FROM Applications WHERE editState = 'archived' AND username = ?",username,function(err,result)
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
