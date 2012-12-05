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
