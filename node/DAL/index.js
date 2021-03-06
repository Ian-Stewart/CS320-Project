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
exports.isUserValid = function(username, pass, callback)
{ 
    conn.query("SELECT password FROM Logins WHERE u_name = ?", username, function(err, result) 
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

exports.saveForm = function(username,form,callback)
{
    var done = false;
    
    var allowEdit = function() //this gets run when if and only if the user is actually allowed to do the edit
    {
        conn.query("UPDATE FormA SET ? WHERE aid=?", [form, form.aid], function(err, result)
        {
            if(err) //there was a database error
            {
                callback({status: false, value: undefined, ErrMsg: "Database Error"});
            }
            else //everything worked, return success
            {
                callback({status: true, value: undefined, ErrMsg: undefined});
            }
        });
    };
    
    //check if the user has permissions to edit the form
    conn.query("SELECT * FROM Logins INNER JOIN On_Permissions ON Logins.uid=On_Permissions.uid WHERE Logins.username=?", username,  function(err, result)
    {
        if(err) //there was a database error
        {
            callback({status: false, value: undefined, ErrMsg: "Database Error"});
        }
        else //we can keep going
        {
            //make another database call
            conn.query("SELECT * FROM Applications WHERE aid=?", form.aid, function(err, a_result)
            {
                if(err) //there was a database error
                {
                    callback({status: false, value: undefined, ErrMsg: "Database Error"});
                }
                else if (!a_result[0]) //there was a database error
                {
                    callback({status: false, value: undefined, ErrMsg: "Database Error"});                
                }
                else //we can keep checking
                {
                    for(var r in result) //check all permissions that the user has to see if any of them allow the user to edit this form
                    {   
                        if(result[r].permid === 12341) // the user is a cci
                        {
                            if(a_result[0].submissionState === 'CCI') //check if a cci user can edit this form
                            {
                                if(!done)
                                {
                                    done = true;
                                    allowEdit();
                                }
                            }
                        }
                        if(result[r].permid === 123912) //the user is a pi user
                        {   
                            //check if a pi user can edit this form
                            if(a_result[0].editState === 'open' && a_result[0].submissionState !== 'IRB' && a_result[0].submissionState !== 'CCI' && a_result[0].approvalState === 'null')
                            {
                                if(!done)
                                {
                                    done = true;
                                    allowEdit();
                                }   
                            }
                        }
                        if(result[r].permid === 324552) //the user is an irb user
                        {
                            if(a_result[0].submissionState === 'IRB') //check if an irb user can edit this form
                            {
                                if(!done)
                                {
                                    done = true;
                                    allowEdit();
                                }
                            }
                        } 
                    }
                    if (!done) //we have fallen through and we do not have permissions
                    {
                        done = true; 
                        callback({status: false, value: undefined, ErrMsg: "Insufficient Permissions Error"});
                    }
                }
            });
        }
    });
}
                        
exports.createApplication = function(username, title, callback)
{
    conn.query("INSERT INTO Applications(proposalTitle) VALUES(?)", title, function(err, result)
    {
        if(err)
        {
            console.log(err);
            callback({status:false,value: undefined,ErrMsg:"Database Error"});
        }
        else
        {
            console.log(result);
            conn.query("INSERT INTO forma(aid) VALUES(?)", result.insertId, function(err, result2)
            {
                if(err)
                {
                    console.log(err);
                    callback({status:false,value: undefined,ErrMsg:"Database Error"});
                }
                else
                {
                    callback({status:true, value:{aid: result.insertId},ErrMsg:undefined});
                }
            });
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
    conn.query("SELECT * FROM Applications WHERE username = ?",username,function(err,result)
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
